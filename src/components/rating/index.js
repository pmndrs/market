import { useEffect } from 'react'
import useRatingsStore from '@/helpers/store/rating'
import StarRating from './StarRating'

const Rating = ({ id }) => {
  const { getRatings } = useRatingsStore()

  useEffect(() => {
    getRatings(id)
  }, [id, getRatings])

  return (
    <section aria-labelledby='ratings-title'>
      <h2
        id='ratings-title'
        className='py-6 text-lg font-medium text-gray-900 leading-6'
      >
        Reviews
      </h2>
      <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
        <div className='divide-y divide-gray-200'>
          <div className='px-4 py-6 sm:px-6'>
            <StarRating id={id} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Rating
