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
    uploadingError: false,
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
    file: null,
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
    sizes: {
      map: '',
      aoMap: '',
      displacementMap: '',
      normalMap: '',
      roughnessMap: '',
    },
    maps: {
      map: '',
      aoMap: '',
      displacementMap: '',
      normalMap: '',
      roughnessMap: '',
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
    uploadAsset: async (file) => {
      set({ file, size: file.size })
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
      const stats = await getStats(json)
      set({ file, stats, size: file.size })
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
    uploadAssetFile: async () => {
      const state = get()
      const fileName = state.file ? encodeURIComponent(state.file.name) : ''
      let file
      if (state.selectedType.url === 'models') {
        const { data: modelData } = await supabase.storage
          .from(state.selectedType.url)
          .upload(`${state.slug}/model.gltf`, state.file)
        file = `${url}${modelData.Key}`
      }

      if (state.selectedType.url === 'hdris') {
        const { data: modelData } = await supabase.storage
          .from(state.selectedType.url)
          .upload(`${state.slug}/${fileName}`, state.file)
        file = `${url}${modelData.Key}`
      }
      if (state.selectedType.name === 'Matcap') {
        const { data: modelData } = await supabase.storage
          .from(state.selectedType.url)
          .upload(`${state.slug}/${fileName}`, state.file)
        file = `${url}${modelData.Key}`
      }

      if (state.selectedType.name === 'PBR Material') {
        file = {}
        const maps = Object.keys(state.maps).map(async (name) => {
          const { data: pbrData } = await supabase.storage
            .from(state.selectedType.url)
            .upload(`${state.slug}/${state.maps[name].name}`, state.maps[name])
          file = {
            ...file,
            [name]: `${url}${pbrData.Key}`,
          }
        })

        await Promise.all(maps)
      }

      return file
    },
    uploadThumbnail: async () => {
      const state = get()
      const { data: thumbnailData } = await supabase.storage
        .from(state.selectedType.url)
        .upload(`${state.slug}/thumbnail.png`, state.thumbnail)
      return `${url}${thumbnailData.Key}`
    },
    createAsset: async () => {
      try {
        set({ createdAsset: null, uploadingError: false })
        const state = get()
        const user = useStore.getState().user
        const id = `${state.selectedType.url.slice(0, -1)}/${state.slug}`
        const assetData = {
          _id: id,
          name: state.name,
          category: state.category,
          license: state.license.value,
          user_id: user.profile.id,
          approved: false,
          size: state.size,
        }
        if (state.selectedType.url === 'models') assetData.stats = state.stats
        set({ loadingText: 'Uploading your asset' })
        const file = await state.uploadAssetFile()
        set({ loadingText: 'Uploading your thumbnail' })
        const thumbnail = await state.uploadThumbnail()
        set({ loadingText: 'Setting Creator' })
        const creator = await state.getCreator()
        set({ loadingText: 'Setting the team' })
        const team = state.partOfTeam ? await state.getTeam() : null
        set({ loadingText: 'Creating Asset' })
        if (state.selectedType.name === 'PBR Material') {
          const sizes = Object.keys(state.maps).reduce((acc, curr) => {
            acc[curr] = state.maps[curr].size
            return acc
          }, {})
          const size = Object.values(sizes).reduce((acc, curr) => {
            acc = acc + curr
            return acc
          }, 0)

          const data = {
            ...assetData,
            sizes,
            thumbnail,
            maps: file,
            creator,
            size,
            team,
          }
          await supabase.from(state.selectedType.url).insert(data)
        } else {
          await supabase
            .from(state.selectedType.url)
            .insert({ thumbnail, file, creator, team, ...assetData })
        }

        set({ loadingText: 'We are done' })
        set({ createdAsset: id })
      } catch (e) {
        console.error(e)
        set({
          loadingText: 'There has been an error, please try again.',
          uploadingError: true,
        })
      }
    },
  }
})

export default useAddAssetStore
