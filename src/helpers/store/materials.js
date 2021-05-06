import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const useStore = create((set, get) => {
  return {
    defaultMaterials: null,
    currentMaterials: [],
    search: '',
    createZip: async (material) => {
      var zip = new JSZip()
      const images = Object.values(material.info.links)
      const a = images.map(async (image) => {
        const parts = image.split('/')
        const name = parts[parts.length - 1]
        const data = await fetch(image).then((a) => a.blob())
        zip.file(name, data)
      })

      await Promise.all(a)
      const pbrImages = await zip.generateAsync({ type: 'blob' })
      saveAs(pbrImages, `${material.folder}.zip`)
    },
    setSearch: (e) => {
      const search = e.target.value
      const defaultMaterials = get().defaultMaterials
      set({ search: search })
      if (search.length) {
        const searchResults = defaultMaterials.filter((material) => {
          return (
            material.info.category
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            material.info.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentMaterials: searchResults })
      } else {
        set({ currentMaterials: defaultMaterials })
      }
    },
  }
})

export default useStore
