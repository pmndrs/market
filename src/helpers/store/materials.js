import create from 'zustand'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { createCode } from '../code/matcaps/r3f'
import { createCode as createThreeCode } from '../code/matcaps/three'
import { createCode as createR3FPBRCode } from '../code/pbr/r3f'
import { createCode as createThreePBRCode } from '../code/pbr/three'

const useStore = create((set, get) => {
  return {
    defaultMaterials: null,
    currentMaterials: [],
    search: '',
    createPBRCodeDownload: async (material, tab) => {
      let code = ''
      if (tab === 'r3f') {
        code = await createR3FPBRCode(material.info.links)
      } else {
        code = await createThreePBRCode(material.info.links)
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
      const parts = material.url.split('/')
      const name = parts[parts.length - 1]
      const data = await fetch(
        'https://api.market.pmnd.rs' + material.url
      ).then((a) => a.blob())
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
      const images = Object.values(material.info.links).map(
        (link) => `https://api.market.pmnd.rs/files${link}`
      )
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
