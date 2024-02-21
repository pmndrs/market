import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode as createR3FHDRICode } from '../code/hdri/r3f'
import { createCode as createThreeHDRICode } from '../code/hdri/three'
import { sortAssets } from './utils'

const useHDRIStore = create((set, get) => {
  return {
    defaultHdri: null,
    currentHdri: [],
    search: '',
    orderBy: 'alphabetic',
    orderDirection: 'asc',
    setOrderBy: (orderBy, hdris) => {
      set({ orderBy })
      const currentHdri = hdris || get().currentHdri
      return sortAssets(orderBy, currentHdri, get().orderDirection)
    },
    setOrderDirection: (orderDirection) => {
      set({ orderDirection })
      const currentHdri = get().currentHdri
      return sortAssets(get().orderBy, currentHdri, get().orderDirection)
    },
    createHDRIDownload: async (hdri, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = await createR3FHDRICode(hdri)
      } else {
        code = await createThreeHDRICode(hdri)
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
      const orderBy = get().orderBy
      const setOrderBy = get().setOrderBy
      set({ search: search })
      if (search.length) {
        const searchResults = defaultHdri.filter((hdri) => {
          return (
            hdri.category.includes(search.toLowerCase()) ||
            hdri.id.toLowerCase().includes(search.toLowerCase()) ||
            hdri.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentHdri: setOrderBy(orderBy, searchResults) })
      } else {
        set({ currentHdri: setOrderBy(orderBy, defaultHdri) })
      }
    },
  }
})

export default useHDRIStore
