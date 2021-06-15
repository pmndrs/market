import { cleanSupabaseData } from '@/helpers/api/cleanSupabaseData'
import { listData } from '@/helpers/api/queries/list'
import { supabase } from '@/helpers/initSupabase'

export const getInfo = async (type, slug) => {
  const creatorRequest = await supabase
    .from(type)
    .select()
    .eq('url', slug)
    .limit(1)
  const creator = creatorRequest.data[0]
  let assets = {}
  const promiseToWait = Object.keys(listData).map(async (t) => {
    const assetTypeData = await supabase
      .from(t)
      .select(listData[t])
      .eq(type.slice(0, -1), creator.id)
      .filter('approved', 'eq', true)

    assets[t] = cleanSupabaseData(assetTypeData.data)
  })

  await Promise.all(promiseToWait)
  return {
    ...creator,
    ...assets,
  }
}

export default async function handler(req, res) {
  try {
    const assetType = req.query.type
    if (assetType !== 'creators' && assetType !== 'teams') {
      res.status(404).json({})
      return
    }
    const name = req.query.name
    const data = await getInfo(assetType, name)
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
  }
}
