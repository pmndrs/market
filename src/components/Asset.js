import React from 'react'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import { API_ENDPOINT } from '@/helpers/constants/api'
import { getMaterialSize } from '@/helpers/getMaterialSize'

const HDRI = (hdri) => {
  return (
    <li className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={'/' + hdri.id}
      >
        <a>
          <div className='relative'>
            <span className='absolute right-0 z-10 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
              {hdri.category}
            </span>{' '}
            <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
              <img
                src={`${API_ENDPOINT}${hdri.thumbnail}`}
                alt=''
                className='object-cover pointer-events-none group-hover:opacity-75'
              />
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
              {hdri.name}
            </p>
            <FavoriteButton type='hdris' asset={hdri} />
          </div>
          <p className='block text-sm font-medium text-gray-500'>
            {getMaterialSize(hdri)}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default HDRI
