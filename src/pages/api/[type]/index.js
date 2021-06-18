import { cleanSupabaseData } from '@/helpers/api/cleanSupabaseData'
import { getAssetFavorites } from '@/helpers/api/endpoints/favorite'
import { listData } from '@/helpers/api/queries/list'
import { supabase } from '@/helpers/initSupabase'

export default async function handler(req, res) {
  try {
    const assetType = req.query.type
    if (assetType === 'favorites') {
      const team = await getAssetFavorites(req.query.favs)
      res.status(200).json(team)
    } else {
      const { data, error } = await supabase
        .from(assetType)
        .select(listData[assetType])
        .filter('approved', 'eq', true)
        .order('id', { ascending: false })
      if (error) {
        console.log(error)
      }
      const value = cleanSupabaseData(data)
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
      res.status(200).json(value)
    }
  } catch (e) {
    console.log(e)
  }
}
