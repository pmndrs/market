import { supabase } from '@/helpers/initSupabase'
import { cleanSupabaseData } from '../cleanSupabaseData'
import { listData } from '../queries/list'

export const getAssetFavorites = async (favs) => {
  try {
    const favorites = favs.split(',').map((fav) => {
      const [type, name] = fav.split('/')

      return {
        type: type + 's',
        name,
        fullid: fav,
      }
    })

    const favData = favorites.map(async (fav) => {
      const re = await supabase
        .from(fav.type)
        .select(listData[fav.type])
        .eq('_id', fav.fullid)

      return re.data[0]
    })

    const data = await Promise.all(favData)
    const value = cleanSupabaseData(data)

    return value
  } catch (err) {
    console.log('Error', err)
  }
}
