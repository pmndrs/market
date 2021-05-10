import React from 'react'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import FavoriteButton from './FavoriteButton'

const Model = (model) => {
  return (
    <li key={model.image} className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/model/${model.url}`}
      >
        <a>
          <div className='relative'>
            <span className='absolute right-0 z-10 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
              {model.info.category}
            </span>{' '}
            <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
              <img
                src={`https://api.market.pmnd.rs/${model.image}`}
                alt=''
                className='object-cover pointer-events-none group-hover:opacity-75'
              />
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
              {model.info?.name}
            </p>
            <FavoriteButton type='models' asset={model} />
          </div>
          <p className='block text-sm font-medium text-gray-500'>
            {model.highPoly && (
              <Tippy content='Large model'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 mr-2 text-yellow-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </Tippy>
            )}
            {model.size}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default Model
