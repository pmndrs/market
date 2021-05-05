import create from 'zustand'

const useStore = create((set, get) => {
  return {
    defaultMaterials: null,
    currentMaterials: [],
    search: '',
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
