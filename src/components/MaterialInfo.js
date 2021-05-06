import useStore from '@/helpers/store/materials'
import { licenses } from '../helpers/constants/licenses'

import { getMaterialSize } from '../helpers/getMaterialSize'

const ModelInfo = (material) => {
  const { createZip } = useStore((state) => ({
    createZip: state.createZip,
  }))

  return (
    <div className='mt-5'>
      <div className='block mb-5 overflow-hidden bg-gray-100 rounded group w-80'>
        <img
          src={material.image}
          alt={material.info.name}
          className='object-cover pointer-events-none'
        />
      </div>
      <aside className='relative'>
        <span className='text-gray-600'>Created by: </span>
        <a
          target='_blank'
          href={material.info.creatorLink}
          rel='noreferrer'
          className='font-bold'
        >
          {material.info.creator}
        </a>
        <span className='block'>
          <span className='text-gray-600'>License: </span>{' '}
          {licenses[material.info.license] ? (
            <a
              target='_blank'
              href={licenses[material.info.license].link}
              rel='noreferrer'
              className='font-bold'
            >
              {licenses[material.info.license].name}
            </a>
          ) : (
            <span className='font-bold'>{material.info.license}</span>
          )}
        </span>
        <span className='flex items-center'>
          <span className='pr-2 text-gray-600 '>Size: </span>{' '}
          <span className='inline-flex font-bold'>
            <span>{getMaterialSize(material)}</span>
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
              onClick={() => createZip(material)}
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
