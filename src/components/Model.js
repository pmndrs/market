import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const ModelC = dynamic(() => import('@/components/canvas/Model'), {
  ssr: false,
})

const Model = (model) => {
  const [open, setOpen] = useState(false)

  return (
    <li key={model.image} className='relative'>
      <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
        <img
          src={model.image}
          alt=''
          className='object-cover pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          className='absolute inset-0 focus:outline-none'
          onClick={() => setOpen(!open)}
        >
          <span className='sr-only'>View details for {model.info.name}</span>
        </button>
      </div>
      <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
        {model.info.name}
      </p>
      <p className='block text-sm font-medium text-gray-500 pointer-events-none'>
        {model.size}MB
      </p>
      {open && (
        <div className='mt-5'>
          <span className='block'>
            Created by{' '}
            <a target='_blank' href={model.info.creatorLink} rel='noreferrer'>
              {model.info.creator}
            </a>
          </span>
          <span className='block'> Licence: {model.info.license}</span>
          <a href={model.gltf} download>
            Download GLTF
          </a>
          <div style={{ width: 500, height: 500 }}>
            <ModelC buffer={model.buffer} />
          </div>
        </div>
      )}
    </li>
  )
}

export default Model
