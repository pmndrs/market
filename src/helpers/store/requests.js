import create from 'zustand'
import { supabase } from '../../helpers/initSupabase'

const useStore = create((set, get) => {
  return {
    requests: [],
    setRequests: (requests) => {
      set({ requests })
    },
    submitRequest: async ({
      request,
      description = '',
      category = 'Model',
      user,
    }) => {
      const requests = get().requests
      if (!user) return null

      const newRequest = {
        request,
        description: description || '',
        category: category || 'Model',
        upvotes: [user?.id],
        user_id: user?.id,
        created: new Date(),
      }
      set({ requests: [{ id: 'fake-id', ...newRequest }, ...requests] })
      useStore.setState({ requesting: false })
      const { error } = await supabase.from('requests').insert([newRequest])

      if (error) {
        set({ requests })
      }
    },
    vote: async (id, upvotes, userId) => {
      const requests = get().requests
      const newRequests = requests.map((req) => {
        if (req.id === id) {
          return { ...req, upvotes: [...req.upvotes, userId] }
        }

        return req
      })
      set({ requests: newRequests })
      const { error } = await supabase
        .from('requests')
        .update({ upvotes: [...upvotes, userId] })
        .match({ id })

      if (error) {
        set({ requests })
      }
    },
  }
})

export default useStore
