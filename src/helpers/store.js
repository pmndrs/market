import create from 'zustand'

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
    setSearch: (e) => {
      const search = e.target.value
      const models = get().currentModels
      const defaultModels = get().defaultModels
      set({ search: search })
      if (search.length) {
        const searchResults = models.filter((model) => {
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
