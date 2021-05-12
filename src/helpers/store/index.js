import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FModelCode } from '../code/model/r3f'
import { createCode as createThreeModelCode } from '../code/model/three'
import { supabase } from '@/helpers/initSupabase'

const useStore = create((set, get) => {
  return {
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
      set({ search: search })
      if (search.length) {
        const searchResults = defaultModels.filter((model) => {
          return (
            model.category.includes(search.toLowerCase()) ||
            model.id.toLowerCase().includes(search.toLowerCase()) ||
            model.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentModels: searchResults })
      } else {
        set({ currentModels: defaultModels })
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
  }
})

export default useStore
