import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'
import { getStats } from '../getStats'
import useStore from '.'
import { slugify } from '../slugify'
const assetTypes = [
  {
    name: 'Model',
    url: 'models',
  },
  {
    name: 'HDRI',
    url: 'hdris',
  },
  {
    name: 'PBR Material',
    url: 'materials',
  },
  {
    name: 'Matcap',
    url: 'materials',
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

      set({ model: file, stats })
    },
    createAsset: async () => {
      const { user } = useStore()

      if (get().creatorMe) {
        set({
          creator: {
            slug: slugify(user.profile.name),
            name: user.profile.name,
            link: '',
            imageLink: user.profile.avatar,
            donateLink: '',
          },
        })
      }
      const { data: modelData } = await supabase.storage
        .from(get().selectedType.url)
        .upload(`${get().slug}/model.gltf`, get().model)

      const { data: thumbnailData } = await supabase.storage
        .from(get().selectedType.url)
        .upload(`${get().slug}/thumbnail.png`, get().thumbnail)
    },
  }
})

export default useAddAssetStore
