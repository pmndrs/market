import { licenses } from '../helpers/constants/licenses'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const ModelInfo = (material) => {
  const generateZip = async () => {
    var zip = new JSZip()
    const images = Object.values(material.links)
    const a = images.map(async (image) => {
      const parts = image.split('/')
      const name = parts[parts.length - 1]
      const data = await fetch(image).then((a) => a.blob())
      console.log(data)
      zip.file(name, data)
    })

    await Promise.all(a)
    const pbrImages = await zip.generateAsync({ type: 'blob' })
    saveAs(pbrImages, `${material.folder}.zip`)
  }

  return (
    <div className='mt-5'>
      <div className='block mb-5 overflow-hidden bg-gray-100 rounded group w-80'>
        <img
          src={material.image}
          alt={material.name}
          className='object-cover pointer-events-none'
        />
      </div>
      <aside className='relative'>
        <span className='text-gray-600'>Created by: </span>
        <a
          target='_blank'
          href={material.creatorLink}
          rel='noreferrer'
          className='font-bold'
        >
          {material.creator}
        </a>
        <span className='block'>
          <span className='text-gray-600'>License: </span>{' '}
          {licenses[material.license] ? (
            <a
              target='_blank'
              href={licenses[material.license].link}
              rel='noreferrer'
              className='font-bold'
            >
              {licenses[material.license].name}
            </a>
          ) : (
            <span className='font-bold'>{material.license}</span>
          )}
        </span>
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            <span>{material.size}</span>
          </span>
        </span>
        {material.category && (
          <>
            <span className='text-gray-600'>Category: </span>
            <span className='inline-flex items-center px-2 mt-1 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'>
              {material.category}
            </span>
          </>
        )}
        <div className='mt-7'>
          {material.category === 'matcaps' ? (
            <a
              className='block w-full py-2 text-center text-white bg-gray-800'
              download
              href={material.url}
            >
              Download
            </a>
          ) : (
            <button
              className='block w-full py-2 text-center text-white bg-gray-800'
              onClick={generateZip}
            >
              Download
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default ModelInfo
