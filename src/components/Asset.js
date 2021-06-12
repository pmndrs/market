import React from 'react'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import Tippy from '@tippyjs/react'
import { getMaterialSize } from '@/helpers/getMaterialSize'
import useStore from '@/helpers/store'

const Asset = (asset) => {
  const user = useStore((store) => store.user)
  const type = asset.id.split('/')[0] + 's'

  return (
    <li className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={'/' + asset.id}
      >
        <a>
          <div className='relative'>
            {!asset.approved && (
              <div className='absolute w-full text-center text-gray-900 top-[50%] left-[50%] z-[100] transform translate-x-[-50%] translate-y-[-50%]'>
                Pending Approval
              </div>
            )}
            <Link href={`/${type}/categories/${asset.category}`}>
              <a className='absolute right-0 z-20 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
                {asset.category}
              </a>
            </Link>
            <div
              className={
                'block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'
              }
              style={{
                opacity: asset.approved ? 1 : 0.5,
              }}
            >
              {asset.unprocessed ? (
                <div className='relative group-hover:opacity-75'>
                  <img
                    src='/bg.jpg'
                    alt=''
                    className='absolute object-cover top-[-30px]'
                  />
                  <img
                    src={`${asset.thumbnail}`}
                    alt={asset.name}
                    style={{
                      transform: 'scale(1.5) translateY(-36%)',
                    }}
                    loading='lazy'
                    className='absolute z-10 min-w-full min-h-[280px]'
                  />
                </div>
              ) : (
                <img
                  src={`${asset.thumbnail}`}
                  alt={asset.name}
                  loading='lazy'
                  className='object-cover pointer-events-none group-hover:opacity-75'
                />
              )}
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
              {asset.name}
            </p>
            {user && <FavoriteButton asset={asset} />}
          </div>
          <p className='flex text-sm font-medium text-gray-500'>
            {asset.highPoly && (
              <Tippy content='Large Asset'>
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
            {getMaterialSize(asset)}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default Asset
