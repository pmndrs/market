export const getName = (image) => {
  const parts = image.split('/')
  const name = parts[parts.length - 1]

  return name
}
export const getImages = async (files, path) => {
  const images = Object.values(files)
  const promises = images.map(async (image) => {
    const name = getName(image)
    const data = await fetch(image).then((a) => a.blob())

    return { filename: `${path}/${name}`, code: data }
  })

  const all = await Promise.all(promises)

  return all
}
