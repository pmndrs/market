import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'
import { getStats } from '../getStats'
import useStore from '.'
import { slugify } from '../slugify'
import { getSize } from './formatSize'

const url = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/'
const assetTypes = [
  {
    name: 'Model',
    url: 'models',
  },
  {
    name: 'HDRI',
    url: 'hdris',
    disabled: true,
  },
  {
    name: 'PBR Material',
    url: 'materials',
    disabled: true,
  },
  {
    name: 'Matcap',
    url: 'materials',
    disabled: true,
  },
]

const licenses = [
  {
    name: 'CC0',
    description: 'Work becomes public domain.',
    value: 1,
  },
  {
    name: 'CC-BY',
    value: 2,
    description:
      'Anyone is able to share or adapt the work but you need to be credited.',
  },
]
const useAddAssetStore = create((set, get) => {
  return {
    assetTypes,
    selectedType: assetTypes[0],
    name: '',
    licenses,
    license: licenses[0],
    category: '',
    slug: '',
    slugAvailable: true,
    availableCats: [],
    thumbnail: '',
    stats: {},
    model: null,
    creatorMe: true,
    creator: {
      slug: '',
      name: '',
      link: '',
      imageLink: '',
      donateLink: '',
    },
    partOfTeam: false,
    team: {
      slug: '',
      name: '',
      link: '',
      imageLink: '',
      donateLink: '',
    },
    uploadFile: async (file) => {
      const slug = get().slug
      if (!slug) {
        toast.error('Before Uploading you need to fill in the slug')
        return
      }

      set({ thumbnail: file })
    },
    uploadModel: async (file) => {
      const slug = get().slug
      if (!slug) {
        toast.error('Before Uploading you need to fill in the slug')
        return
      }
      const reader = new FileReader()
      const text = await new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result)
        reader.onerror = (error) => reject(error)
        reader.readAsText(file)
      })
      const json = JSON.parse(text)
      const stats = getStats(json)
      const { size, highPoly } = getSize(file.size)

      set({ model: file, stats, size, highPoly })
    },
    createAsset: async () => {
      const state = get()
      const data = {
        _id: `${state.selectedType.url.slice(0, -1)}/${state.slug}`,
        name: state.name,
        category: state.category,
        stats: state.stats,
        license: state.license.value,
        size: state.size,
        highPoly: state.highPoly,
        user_id: user.profile.id,
      }
      if (state.creatorMe) {
        set({
          creator: {
            slug: slugify(user.profile.name),
            name: user.profile.name,
            imageLink: user.profile.avatar,
          },
        })
      }
      const { data: modelData } = await supabase.storage
        .from(state.selectedType.url)
        .upload(`${state.slug}/model.gltf`, state.model)
      const model = `${url}${modelData.Key}`
      const { data: thumbnailData } = await supabase.storage
        .from(state.selectedType.url)
        .upload(`${state.slug}/thumbnail.png`, state.thumbnail)
      const thumbnail = `${url}${thumbnailData.Key}`

      console.log({
        thumbnail,
        model,
        creator: state.creator,
        team: state.partOfTeam ? state.team : null,
        ...data,
      })
    },
  }
})

export default useAddAssetStore
