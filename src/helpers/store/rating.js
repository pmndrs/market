import toast from 'react-hot-toast'
import create from 'zustand'
import { supabase } from '../initSupabase'
import getRatingsMean from '../getRatingsMean'

const useRatingStore = create((set, get) => {
  return {
    rating: 0,
    getRatings: async (id) => {
      const ratings = await supabase
        .from('ratings')
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
      set({ rating: getRatingsMean(ratings.data) })
    },
    addRating: async (userRating, user, assetId) => {
      try {
        const newRating = {
          user_id: user.profile.id,
          rating: userRating.toString(),
          asset_id: assetId,
        }

        const ratings = await supabase
          .from('ratings')
          .select('id')
          .eq('user_id', user.profile.id)
          .eq('asset_id', assetId)

        if (ratings.data.length === 0) {
          await supabase
            .from('ratings')
            .insert([newRating])
            .eq('user_id', user.profile.id)
            .eq('asset_id', assetId)
        } else {
          await supabase
            .from('ratings')
            .update(newRating)
            .eq('user_id', user.profile.id)
            .eq('asset_id', assetId)
        }

        await get().getRatings(assetId)
        toast.success('Rating updated successfully')
      } catch (e) {
        console.log(e)
        toast.error('There has been a problem adding your rating')
      }
    },
  }
})

export default useRatingStore
