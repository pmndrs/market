const fetch = require('node-fetch')
const cheerio = require('cheerio')
const ntc = require('./ntx')
const fs = require('fs')
const path = require('path')
const starterI = 681
const init = async () => {
  const body = await fetch(
    'https://github.com/nidorx/matcaps/blob/master/PAGE-33.md'
  ).then((res) => res.text())

  const $ = cheerio.load(body)

  const arr = []
  $('article.markdown-body h3')
    .map(function (i, el) {
      const nextThings = $(this).nextUntil('hr')
      let images = {}
      nextThings.filter(function (i, el) {
        if ($(this).text().trim().includes('1024px')) {
          images[1024] = $(this).find('a').attr('href')
        }
        if ($(this).text().trim().includes('512px')) {
          images[512] = $(this).find('a').attr('href')
        }
        if ($(this).text().trim().includes('256px')) {
          images[256] = $(this).find('a').attr('href')
        }
        if ($(this).text().trim().includes('128px')) {
          images[128] = $(this).find('a').attr('href')
        }
        if ($(this).text().trim().includes('64px')) {
          images[64] = $(this).find('a').attr('href')
        }
      })
      const title = $(this).text()
      ntc.init()
      const colors = title.split('_').map((color) => {
        return {
          color,
          name: ntc.name('#' + color)[1],
        }
      })
      arr.push({
        index: i + starterI,
        title,
        preview: 'https://github.com/' + nextThings.find('img').attr('src'),
        colors,
        ...images,
      })
    })
    .get()

  arr.forEach((matcap) => {
    const resources = path.join(process.cwd(), 'public/matcaps')
    const newFolder = `${resources}/${matcap.title}`
    fs.mkdirSync(newFolder)
    fs.writeFileSync(`${newFolder}/info.json`, JSON.stringify(matcap, null, 2))
  })

  return arr
}

init().then((a) => console.log(a[a.length - 1].index))
