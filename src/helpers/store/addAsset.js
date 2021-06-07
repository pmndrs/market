import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'
const assetTypes = [
  {
    name: 'Model',
    url: 'models',
  },
  {
    name: 'HDRI',
    url: 'hdris',
  },
  {
    name: 'PBR Material',
    url: 'materials',
  },
  {
    name: 'Matcap',
    url: 'materials',
  },
]

const licenses = [
  {
    name: 'CC0',
    description: 'Work becomes public domain.',
    value: 1,
  },
  {
    name: 'CC-BY',
    value: 2,
    description:
      'Anyone is able to share or adapt the work but you need to be credited.',
  },
]
const useAddAssetStore = create((set, get) => {
  return {
    assetTypes,
    selectedType: assetTypes[0],
    name: '',
    licenses,
    license: licenses[0],
    category: '',
    slug: '',
    availableCats: [],
    thumbnail: '',
    uploadFile: async (file) => {
      const slug = get().slug
      if (!slug) {
        toast.error('Before Uploading you need to fill in the slug')
        return
      }
      const { data } = await supabase.storage
        .from(get().selectedType.url)
        .upload(`${slug}/thumbnail.png`, file)

      set({ thumbnail: data })
    },
    uploadModel: async (file) => {
      const slug = get().slug
      // if (!slug) {
      //   toast.error('Before Uploading you need to fill in the slug')
      //   return
      // }
      const { data } = await supabase.storage
        .from(get().selectedType.url)
        .upload(`${'aaa'}/model.gltf`, file)
      console.log(data)

      set({ thumbnail: data })
    },
  }
})

export default useAddAssetStore
