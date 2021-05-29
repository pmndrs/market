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
            user_id,
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
    deleteComment: async (commentid) => {
      try {
        await supabase.from('comments').delete().match({ id: commentid })

        set({
          comments: [
            ...get().comments.filter((comment) => comment.id !== commentid),
          ],
        })
      } catch (e) {
        toast.error('There has been a problem delting your comment')
      }
    },
    updateComment: async (user, id, newComment) => {
      try {
        const newComments = await supabase
          .from('comments')
          .update({ comment: newComment })
          .match({ id })
        const newCommentData = newComments.data[0]
        set({
          comments: [
            ...get().comments.map((comment) => {
              if (comment.id === id) {
                return {
                  ...comment,
                  comment: newCommentData.comment,
                }
              }
              return comment
            }),
          ],
        })
      } catch (e) {
        toast.error('There has been a problem updating your comment')
      }
    },
    createComment: async (user, assetId) => {
      const comment = get().currentComment

      try {
        const newComment = {
          user_id: user.profile.id,
          comment,
          asset_id: assetId,
        }
        const newComments = await supabase.from('comments').insert([newComment])
        set({ currentComment: '' })
        set({
          comments: [
            ...get().comments,
            ...newComments.data.map((comment) => ({
              ...comment,
              profiles: {
                user_id: user.id,
                avatar: user.profile.avatar,
                name: user.profile.name,
              },
            })),
          ],
        })
      } catch (e) {
        toast.error('There has been a problem creating your comment')
      }
    },
  }
})

export default useCommentsStore
