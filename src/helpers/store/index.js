import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FModelCode } from '../code/model/r3f'

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
    createR3FCodeDownload: async (model, jsx, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = await createR3FModelCode(model, jsx)
      } else {
        return
        // code = await createThreePBRCode(material.info.links)
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
            model.info.category.includes(search.toLowerCase()) ||
            model.url.toLowerCase().includes(search.toLowerCase()) ||
            model.info.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentModels: searchResults })
      } else {
        set({ currentModels: defaultModels })
      }
    },
  }
})

export default useStore
