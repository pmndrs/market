const gltfPipeline = require('gltf-pipeline')
const fsExtra = require('fs-extra')
var glob = require('glob')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')

const processGltf = gltfPipeline.processGltf
glob('public/**/*.gltf', {}, function (er, files) {
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

glob('public/**/*.{jpg,png}', {}, async function (er, files) {
  files.forEach(async (file) => {
    const newFile = await imagemin([file], {
      plugins: [imageminJpegtran(), imageminOptipng()],
    })

    fsExtra.removeSync(file)
    fsExtra.writeFileSync(file, newFile[0].data)
  })
})
