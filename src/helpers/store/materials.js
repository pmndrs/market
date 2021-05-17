import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode } from '../code/matcaps/r3f'
import { createCode as createThreeCode } from '../code/matcaps/three'
import { createCode as createR3FPBRCode } from '../code/pbr/r3f'
import { createCode as createThreePBRCode } from '../code/pbr/three'
import { sortAssets } from './utils'

const useStore = create((set, get) => {
  return {
    defaultMaterials: null,
    currentMaterials: [],
    search: '',
    order: 'alphabetic',
    setOrder: (order, materials) => {
      set({ order })
      const currentMaterials = materials || get().currentMaterials

      return sortAssets(order, currentMaterials)
    },
    createPBRCodeDownload: async (material, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = await createR3FPBRCode(material.maps)
      } else {
        code = await createThreePBRCode(material.maps)
      }

      var zip = new JSZip()

      code.map((file) => {
        return zip.file(file.filename, file.code)
      })

      const codeZip = await zip.generateAsync({ type: 'blob' })
      saveAs(
        codeZip,
        `starter-pbr-${window.location.pathname.split('/material/')[1]}.zip`
      )
    },

    createMatcapCodeDownload: async (material, tab) => {
      const parts = material.id.split('/')
      const name = parts[1]
      const data = await fetch(material.file).then((a) => a.blob())
      const suzanne = await fetch('/suzanne.gltf').then((a) => a.text())
      let code = ''
      if (tab === 'r3f') {
        code = createCode(suzanne, name, data)
      } else {
        code = createThreeCode(suzanne, name, data)
      }

      var zip = new JSZip()

      code.map((file) => {
        return zip.file(file.filename, file.code)
      })

      const codeZip = await zip.generateAsync({ type: 'blob' })
      saveAs(codeZip, `starter-matcap-${name.split('.')[0]}.zip`)
    },
    createZip: async (material) => {
      var zip = new JSZip()
      const images = Object.values(material.maps)
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
      const order = get().order
      const setOrder = get().setOrder
      set({ search: search })
      if (search.length) {
        const searchResults = defaultMaterials.filter((material) => {
          return (
            material.category.toLowerCase().includes(search.toLowerCase()) ||
            material.name.toLowerCase().includes(search.toLowerCase())
          )
        })
        set({ currentMaterials: setOrder(order, searchResults) })
      } else {
        set({ currentMaterials: setOrder(order, defaultMaterials) })
      }
    },
  }
})

export default useStore
