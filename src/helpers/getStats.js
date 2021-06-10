import {
  BufferUtils,
  FileUtils,
  ImageUtils,
  WebIO,
  uuid,
} from '@gltf-transform/core'
import {
  DracoMeshCompression,
  MaterialsUnlit,
} from '@gltf-transform/extensions'
import { inspect } from '@gltf-transform/functions'

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function decodeDataURI(resource, resources) {
  // Rewrite Data URIs to something short and unique.
  const resourceUUID = `__${uuid()}.${FileUtils.extension(resource.uri)}`
  resources[resourceUUID] = BufferUtils.createBufferFromDataURI(resource.uri)
  resource.uri = resourceUUID
}

export const getStats = async (json) => {
  try {
    const io = new WebIO()
      .registerExtensions([DracoMeshCompression, MaterialsUnlit])
      .registerDependencies({
        'draco3d.decoder': await window.DracoDecoderModule(),
      })

    const resources = {}
    for (const bufferDef of json.buffers || []) {
      if (bufferDef.uri && bufferDef.uri.startsWith('data:')) {
        decodeDataURI(bufferDef, resources)
      }
    }
    for (const imageDef of json.images || []) {
      if (imageDef.uri && imageDef.uri.startsWith('data:')) {
        decodeDataURI(imageDef, resources)
      }
    }
    const document = io.readJSON({ json, resources })
    const report = inspect(document)

    const faces = report.meshes.properties.reduce(
      (acc, curr) => (acc = curr.glPrimitives + acc),
      0
    )
    const vertices = report.meshes.properties.reduce(
      (acc, curr) => (acc = curr.vertices + acc),
      0
    )
    let totalBytes = 0
    for (let accessor of document.getRoot().listAccessors()) {
      totalBytes += accessor.getByteLength()
    }
    for (let texture of document.getRoot().listTextures()) {
      totalBytes += ImageUtils.getMemSize(
        texture.getImage(),
        texture.getMimeType()
      )
    }

    return {
      extensions: json.extensionsUsed || json.extensionsRequired,
      faces,
      vertices,
      memoryConsumption: formatBytes(totalBytes),
      skinned: document.getRoot().listSkins().length > 0,
      ...report,
    }
  } catch (e) {
    console.log('-----------', e, '-----------')
  }
}
