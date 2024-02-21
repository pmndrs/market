import { supabase } from '@/helpers/initSupabase'
import axios from 'axios'

const getBuffer = async (assetType, name) => {
  const { data } = await supabase
    .from(assetType)
    .select('file')
    .filter('_id', 'eq', `${assetType.slice(0, -1)}/${name}`)
    .limit(1)

  const json = await axios.get(data[0].file)

  return json.data
}

export default async function handler(req, res) {
  const assetType = req.query.type
  const name = req.query.name
  const model = await getBuffer(assetType, name)
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.status(200).json(model)
}
