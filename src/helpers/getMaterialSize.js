export const getMaterialSize = (material) => {
  if (!material.sizes) return material.size

  const size = Object.values(material.sizes).reduce((acc, curr) => {
    acc = acc + curr
    return acc
  }, 0)

  return size > 1000 ? (size / 1000).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'
}
