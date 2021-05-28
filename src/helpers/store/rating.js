import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'

const useRatingStore = create((set, get) => {
  return {
    rating: 0,
    currentRating: 0,
    getRating: async (id) => {
      const rating = await supabase
        .from('rating')
        .select(
          `
          user_id,
          profiles (
            avatar,
            name
          ),
          id,
          rating,
          created_at,
          asset_id
        `
        )
        .eq('asset_id', id)
      set({ rating: rating.data })
    },
    addRating: async (user, assetId) => {
      const rating = get().currentRating

      try {
        const newRating = {
          user_id: user.profile.id,
          rating,
          asset_id: assetId,
        }
        await supabase.from('rating').insert([newRating])

        set({ currentRating: 0 })
        set({
          rating: [
            ...get().rating,
            {
              ...newRating,
              id: `FAKE-ID-${Date.now().toString()}`,
              // created_at: addHours(Date.now(), -2),
              profiles: {
                avatar: user.profile.avatar,
                name: user.profile.name,
              },
            },
          ],
        })
      } catch (e) {
        toast.error('There has been a problem creating your rating')
      }
    },
  }
})

export default useRatingStore
