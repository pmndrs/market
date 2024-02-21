import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FModelCode } from '../code/model/r3f'
import { createCode as createThreeModelCode } from '../code/model/three'
import { supabase } from '@/helpers/initSupabase'
import { sortAssets } from './utils'
import { API_ENDPOINT } from '../constants/api'
import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'

const useStore = create((set, get) => {
  return {
    title: '',
    darkMode: false,
    router: {},
    user: null,
    events: null,
    setEvents: (events) => {
      set({ events })
    },
    defaultModels: null,
    currentModels: [],
    parseBuffer: null,
    search: '',
    orderBy: 'alphabetic',
    orderDirection: 'asc',
    setOrderBy: (orderBy, models) => {
      set({ orderBy })
      const currentModels = models || get().currentModels
      return sortAssets(orderBy, currentModels, get().orderDirection)
    },
    setOrderDirection: (orderDirection) => {
      set({ orderDirection })
      const currentModels = get().currentModels
      return sortAssets(get().orderBy, currentModels, get().orderDirection)
    },
    createModelDownloadZip: async (model, jsx, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = createR3FModelCode(model, jsx)
      } else {
        code = createThreeModelCode(model)
      }

      var zip = new JSZip()

      code.map((file) => {
        return zip.file(file.filename, file.code)
      })

      const codeZip = await zip.generateAsync({ type: 'blob' })
      saveAs(
        codeZip,
        `starter-model-${window.location.pathname.split('/model/')[1]}.zip`
      )
    },
    setSearch: (e) => {
      const search = e.target.value
      const defaultModels = get().defaultModels
      const setOrderBy = get().setOrderBy
      const orderBy = get().orderBy
      set({ search: search })
      if (search.length) {
        const searchResults = defaultModels.filter((model) => {
          return (
            model.category.includes(search.toLowerCase()) ||
            model.id.toLowerCase().includes(search.toLowerCase()) ||
            model.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentModels: setOrderBy(orderBy, searchResults) })
      } else {
        set({ currentModels: setOrderBy(orderBy, defaultModels) })
      }
    },
    toggleFavorite: async (type, name) => {
      const user = get().user
      const favoriteName = `${type}/${name}`
      const currentFavorites = user.profile.favorites
      if (currentFavorites && currentFavorites.includes(favoriteName)) {
        const favorites = currentFavorites.filter((fav) => fav !== favoriteName)

        await supabase
          .from('profiles')
          .update({ favorites })
          .eq('user_id', user.id)
        set({
          user: {
            ...user,
            profile: {
              ...user.profile,
              favorites,
            },
          },
        })
      } else {
        const favorites = currentFavorites
          ? [...currentFavorites, favoriteName]
          : [favoriteName]
        await supabase
          .from('profiles')
          .update({ favorites })
          .eq('user_id', user.id)

        set({
          user: {
            ...user,
            profile: {
              ...user.profile,
              favorites,
            },
          },
        })
      }
    },
    createBuffer: async (name) => {
      const buffer = await fetch(`${API_ENDPOINT}/models/${name}/buffer`).then(
        (data) => data.text()
      )

      const gltfLoader = new GLTFLoader()
      const dracoloader = new DRACOLoader()
      dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
      gltfLoader.setDRACOLoader(dracoloader)
      gltfLoader.setMeshoptDecoder(MeshoptDecoder)

      const result = await new Promise((resolve, reject) =>
        gltfLoader.parse(buffer, '', resolve, reject)
      )
      useStore.setState({ parsedBuffer: result })
    },
  }
})

export default useStore
