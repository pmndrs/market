import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FModelCode } from '../code/model/r3f'
import { createCode as createThreeModelCode } from '../code/model/three'

const useStore = create((set, get) => {
  return {
    defaultHdri: null,
    currentHdri: [],
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
        `starter-hdri-${window.location.pathname.split('/hdri/')[1]}.zip`
      )
    },
    setSearch: (e) => {
      const search = e.target.value
      const defaultHdri = get().defaultHdri
      set({ search: search })
      if (search.length) {
        const searchResults = defaultHdri.filter((hdri) => {
          return (
            hdri.info.category.includes(search.toLowerCase()) ||
            hdri.url.toLowerCase().includes(search.toLowerCase()) ||
            hdri.info.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentHdri: searchResults })
      } else {
        set({ currentHdri: defaultHdri })
      }
    },
  }
})

export default useStore
