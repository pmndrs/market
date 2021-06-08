import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'
import { getStats } from '../getStats'
import useStore from '.'
import { slugify } from '../slugify'

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
    creatorID: null,
    creator: {
      slug: '',
      name: '',
      link: '',
      logo: '',
      donateLink: '',
    },
    partOfTeam: false,
    teamID: null,
    team: {
      slug: '',
      name: '',
      link: '',
      logo: '',
      donateLink: '',
    },
    loadingText: 'Getting your data',
    createdAsset: null,
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
      console.log(file.size)
      set({ model: file, stats, size: file.size })
    },
    getCreator: async () => {
      const state = get()
      const user = useStore.getState().user
      const DB = 'creators'
      let creatorID
      if (state.creatorMe) {
        const creator = {
          url: slugify(user.profile.name),
          name: user.profile.name,
          logo: user.profile.avatar,
        }

        const { data } = await supabase
          .from(DB)
          .select('id')
          .filter('url', 'eq', creator.url)

        if (data.length) {
          creatorID = data[0].id
        } else {
          const { data } = await supabase.from(DB).insert(creator)
          creatorID = data[0].id
        }
      } else {
        if (state.creatorID) {
          creatorID = state.creatorID
        } else {
          const { data } = await supabase.from(DB).insert({
            url: state.creator.slug,
            name: state.creator.name,
            link: state.creator.link,
            logo: state.creator.logo,
            donateLink: state.creator.donateLink,
          })
          creatorID = data[0].id
        }
      }

      return creatorID
    },
    getTeam: async () => {
      const state = get()
      const DB = 'teams'
      let teamID

      if (state.teamID) {
        teamID = state.teamID
      } else {
        const { data } = await supabase.from(DB).insert({
          url: state.team.slug,
          name: state.team.name,
          link: state.team.link,
          logo: state.team.logo,
          donateLink: state.team.donateLink,
        })
        teamID = data[0].id
      }

      return teamID
    },
    createAsset: async () => {
      set({ createdAsset: null })
      const state = get()
      const user = useStore.getState().user
      const id = `${state.selectedType.url.slice(0, -1)}/${state.slug}`
      const assetData = {
        _id: id,
        name: state.name,
        category: state.category,
        stats: state.stats,
        license: state.license.value,
        user_id: user.profile.id,
        approved: false,
        user_id: user.profile.id,
        size: state.size,
      }
      set({ loadingText: 'Uploading your model' })
      const { data: modelData } = await supabase.storage
        .from(state.selectedType.url)
        .upload(`${state.slug}/model.gltf`, state.model)
      const model = `${url}${modelData.Key}`
      set({ loadingText: 'Uploading your thumbnail' })
      const { data: thumbnailData } = await supabase.storage
        .from(state.selectedType.url)
        .upload(`${state.slug}/thumbnail.png`, state.thumbnail)
      const thumbnail = `${url}${thumbnailData.Key}`
      set({ loadingText: 'Setting Creator' })
      const creator = await state.getCreator()
      set({ loadingText: 'Setting the team' })
      const team = state.partOfTeam ? await state.getTeam() : null
      set({ loadingText: 'Creating Asset' })
      await supabase
        .from(state.selectedType.url)
        .insert({ thumbnail, file: model, creator, team, ...assetData })
      set({ loadingText: 'We are done' })
      set({ createdAsset: id })
    },
  }
})

export default useAddAssetStore
