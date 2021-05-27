import { addHours } from 'date-fns'
import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'

const useCommentsStore = create((set, get) => {
  return {
    comments: [],
    currentComment: '',
    getComments: async (id) => {
      const comments = await supabase
        .from('comments')
        .select(
          `
          user_id,
          profiles (
            avatar,
            name
          ),
          id,
          comment,
          created_at,
          asset_id
        `
        )
        .eq('asset_id', id)
      set({ comments: comments.data })
    },
    createComment: async (user, assetId) => {
      const comment = get().currentComment

      try {
        const newComment = {
          user_id: user.profile.id,
          comment,
          asset_id: assetId,
        }
        await supabase.from('comments').insert([newComment])

        set({ currentComment: '' })
        set({
          comments: [
            ...get().comments,
            {
              ...newComment,
              id: `FAKE-ID-${Date.now().toString()}`,
              created_at: addHours(Date.now(), -2),
              profiles: {
                avatar: user.profile.avatar,
                name: user.profile.name,
              },
            },
          ],
        })
      } catch (e) {
        toast.error('There has been a problem creating your comment')
      }
    },
  }
})

export default useCommentsStore
