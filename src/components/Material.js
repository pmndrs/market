import { getMaterialSize } from '@/helpers/getMaterialSize'
import Link from 'next/link'

import FavoriteButton from './FavoriteButton'

const Material = (material) => {
  return (
    <li className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/material/${material.url}`}
      >
        <a>
          <div className='relative'>
            <span className='absolute right-0 z-10 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
              {material.info.category}
            </span>{' '}
            <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
              <img
                src={'https://api.market.pmnd.rs/' + material.preview}
                alt=''
                className='object-cover pointer-events-none group-hover:opacity-75'
              />
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
              {material.info?.name}
            </p>
            <FavoriteButton type='materials' asset={material} />
          </div>
          <p className='flex block text-sm font-medium text-gray-500'>
            {getMaterialSize(material)}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default Material
