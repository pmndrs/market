import { useEffect } from 'react'
import useRatingsStore from '@/helpers/store/rating'
import StarRating from './StarRating'

const Rating = ({ id }) => {
  const { getRatings } = useRatingsStore()

  useEffect(() => {
    getRatings(id)
  }, [id, getRatings])

  return (
    <section className='flex items-center mt-1'>
      <span className='text-gray-600'>Rating: </span>
      <StarRating id={id} />
    </section>
  )
}

export default Rating
