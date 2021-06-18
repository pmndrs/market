import { getSize } from './getSize'

export const cleanSupabaseData = (data) => {
  const value = data.map((m) => {
    const { size, highPoly } = getSize(m.size, '')
    return {
      ...m,
      id: m._id,
      _id: m.id,
      size,
      highPoly,
      originalSize: m.size,
      link: `https://api.market-assets/${m._id}`,
    }
  })

  return value
}
