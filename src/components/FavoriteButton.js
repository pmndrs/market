import useStore from '@/helpers/store'
import Tippy from '@tippyjs/react'
import { useState } from 'react'

const FavoriteButton = ({ asset }) => {
  const [type, name] = asset.id.split('/')
  const user = useStore((state) => state.user)
  const toggleFavorite = useStore((state) => state.toggleFavorite)
  const liked =
    user?.profile?.favorites &&
    user.profile.favorites.includes(`${type}/${name}`)
  const [hover, setHover] = useState()
  return (
    <Tippy content={liked ? `Unfavorite ${type}` : `Favorite ${type}`}>
      <button
        className='z-90'
        onClick={async (e) => {
          e.preventDefault()
          toggleFavorite(type, name)
        }}
        aria-label={liked ? `Unfavorite ${type}` : `Favorite ${type}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {liked || hover ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 text-red-600'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 text-red-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        )}
      </button>
    </Tippy>
  )
}

export default FavoriteButton
