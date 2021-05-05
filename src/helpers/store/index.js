import create from 'zustand'
import { supabase } from '../../helpers/initSupabase'

const useStore = create((set, get) => {
  return {
    router: {},
    user: null,
    events: null,
    requesting: false,
    setEvents: (events) => {
      set({ events })
    },
    defaultModels: null,
    currentModels: [],
    parseBuffer: null,
    search: '',
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
    requests: [],
    setRequests: (requests) => {
      set({ requests })
    },
    submitRequest: async ({ request, description, category }) => {
      const user = get().user
      const requests = get().requests

      if (!user) return null
      const newRequest = {
        request,
        description,
        category,
        upvotes: [user.id],
        user_id: user.id,
        created: new Date(),
      }
      set({ requests: [{ id: 'fake-id', ...newRequest }, ...requests] })
      useStore.setState({ requesting: false })
      const { error } = await supabase.from('requests').insert([newRequest])

      if (error) {
        set({ requests })
      }
    },
    vote: async (id, upvotes) => {
      const requests = get().requests
      const user = get().user
      const newRequests = requests.map((req) => {
        if (req.id === id) {
          return { ...req, upvotes: [...req.upvotes, user.id] }
        }

        return req
      })
      set({ requests: newRequests })
      const { error } = await supabase
        .from('requests')
        .update({ upvotes: [...upvotes, user.id] })
        .match({ id })

      if (error) {
        set({ requests })
      }
    },
  }
})

export default useStore
