import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FModelCode } from '../code/model/r3f'
import { createCode as createThreeModelCode } from '../code/model/three'
import { sortAssets } from './utils'

const useStore = create((set, get) => {
  return {
    defaultHdri: null,
    currentHdri: [],
    search: '',
    order: 'alphabetic',
    setOrder: (order, hdris) => {
      set({ order })
      const currentHdri = hdris || get().currentHdri

      return sortAssets(order, currentHdri)
    },
    createHDRIDownload: async (model, jsx, tab) => {
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
      const order = get().order
      const setOrder = get().setOrder
      set({ search: search })
      if (search.length) {
        const searchResults = defaultHdri.filter((hdri) => {
          return (
            hdri.category.includes(search.toLowerCase()) ||
            hdri.id.toLowerCase().includes(search.toLowerCase()) ||
            hdri.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentHdri: setOrder(order, searchResults) })
      } else {
        set({ currentHdri: setOrder(order, defaultHdri) })
      }
    },
  }
})

export default useStore
