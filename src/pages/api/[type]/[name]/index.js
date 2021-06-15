import { cleanSupabaseData } from '@/helpers/api/cleanSupabaseData'
import { supabase } from '@/helpers/initSupabase'

const selectData = `
*,
team (
  *
),
creator (
 *
)
`

export default async function handler(req, res) {
  try {
    const assetType = req.query.type
    const name = req.query.name

    if (name === 'categories') {
      const { data } = await supabase
        .from(assetType)
        .select(
          assetType === 'models'
            ? 'category, thumbnail, unprocessed'
            : 'category, thumbnail'
        )
        .filter('approved', 'eq', true)

      const categories = data
        .filter((a) => !a.unprocessed)
        .reduce((acc, curr) => {
          const exists = acc.length && acc.find((c) => c.name === curr.category)
          if (exists) return acc

          acc.push({
            name: curr.category,
            [assetType]: [curr],
          })

          return acc
        }, [])
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
      res.status(200).json(categories)
    }
    if (assetType === 'creators' || assetType === 'teams') {
      const { data } = await supabase.from(assetType).select().eq('url', name)
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
      res.status(200).json({
        ...data[0],
        page: !!data[0].url,
      })
    } else {
      const { data } = await supabase
        .from(assetType)
        .select(selectData)
        .eq('_id', `${assetType.slice(0, -1)}/${name}`)
      const current = cleanSupabaseData(data)[0]
      let asset = {
        ...current,
      }
      const next = await supabase
        .from(assetType)
        .select(selectData)
        .eq('id', current._id + 1)
        .filter('approved', 'eq', true)

      if (next.data.length) {
        asset = {
          ...asset,
          next: cleanSupabaseData(next.data)[0],
        }
      }

      if (current._id > 1) {
        const prev = await supabase
          .from(assetType)
          .select(selectData)
          .eq('id', current._id - 1)
          .filter('approved', 'eq', true)
        if (prev.data.length) {
          asset = {
            ...asset,
            prev: cleanSupabaseData(prev.data)[0],
          }
        }
      }

      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
      res.status(200).json(asset)
    }
  } catch (e) {
    console.log(e)
  }
}
