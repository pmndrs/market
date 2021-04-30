import React from 'react'
import Link from 'next/link'

const Model = (model) => {
  return (
    <li key={model.image} className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/model/${model.url}`}
      >
        <a>
          <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
            <img
              src={model.image}
              alt=''
              className='object-cover pointer-events-none group-hover:opacity-75'
            />
          </div>
          <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
            {model.info.name}
          </p>
          <p className='block text-sm font-medium text-gray-500 pointer-events-none'>
            {model.size}KB
          </p>{' '}
        </a>
      </Link>
    </li>
  )
}

export default Model
