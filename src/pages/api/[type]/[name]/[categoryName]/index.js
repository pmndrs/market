import { cleanSupabaseData } from '@/helpers/api/cleanSupabaseData'

import { listData } from '@/helpers/api/queries/list'
import { supabase } from '@/helpers/initSupabase'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  try {
    const { type, categoryName } = req.query
    const { data, error } = await supabase
      .from(type)
      .select(listData[type])
      .filter('approved', 'eq', true)
      .filter('category', 'eq', categoryName)
      .order('id')
    if (error) {
      console.log(error)
    }
    const value = cleanSupabaseData(data)

    res.status(200).json(value)
  } catch (e) {
    console.log(e)
  }
}
