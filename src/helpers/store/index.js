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
    order: 'alphabetic',
    setOrder: (order, models) => {
      set({ order })
      const currentModels = models || get().currentModels

      return sortAssets(order, currentModels)
    },
    createModelDownloadZip: async (model, jsx, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = await createR3FModelCode(model, jsx)
      } else {
        code = await createThreeModelCode(model)
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
      const setOrder = get().setOrder
      const order = get().order
      set({ search: search })
      if (search.length) {
        const searchResults = defaultModels.filter((model) => {
          return (
            model.category.includes(search.toLowerCase()) ||
            model.id.toLowerCase().includes(search.toLowerCase()) ||
            model.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentModels: setOrder(order, searchResults) })
      } else {
        set({ currentModels: setOrder(order, defaultModels) })
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
