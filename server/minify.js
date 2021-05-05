const gltfPipeline = require('gltf-pipeline')
const fsExtra = require('fs-extra')
var glob = require('glob')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')

const processGltf = gltfPipeline.processGltf
glob('public/resources/**/*.gltf', {}, function (er, files) {
  files.forEach((file) => {
    try {
      const gltf = fsExtra.readJsonSync(file)
      processGltf(gltf, {
        dracoOptions: {
          compressionLevel: 10,
        },
      })
        .then(function (results) {
          fsExtra.writeJsonSync(file, results.gltf)
        })
        .catch(() => {})
    } catch {
      //
    }
  })
})

glob('public/resources/**/*.{jpg,png}', {}, async function (er, files) {
  files.forEach(async (file) => {
    const newFile = await imagemin([file], {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    })

    fsExtra.removeSync(file)
    fsExtra.writeFileSync(file, newFile[0].data)
  })
})
