import copy from 'clipboard-copy'
import useStore from '@/helpers/store'
import parse from '@react-three/gltfjsx'

const licenses = {
  1: {
    link: "https://creativecommons.org/share-your-work/public-domain/cc0/'",
    name: 'CC0',
  },
}

const ModelInfo = (material) => {
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
          <a
            className='block w-full py-2 text-center text-white bg-gray-800'
            download
            href={material.url}
          >
            Download
          </a>
        </div>
      </aside>
    </div>
  )
}

export default ModelInfo
