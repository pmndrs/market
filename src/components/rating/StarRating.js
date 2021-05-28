import { useState, useEffect } from 'react'
import useStore from '@/helpers/store'
import useRatingStore from '@/helpers/store/rating'
import Star from './Star'

const numStars = 5
const StarRating = ({ id }) => {
  const { user } = useStore()
  const { rating, addRating } = useRatingStore()
  const [selection, setSelection] = useState(0)
  const [updating, setUpdating] = useState(false)

  const handleHover = (e) => {
    let starId = 0
    if (e && e.target && e.target.getAttribute('star-id')) {
      starId = e.target.getAttribute('star-id')
    }
    setSelection(starId)
  }

  const handleClick = async (e) => {
    setUpdating(true)
    await addRating(selection, user, id)
    setUpdating(false)
  }

  return (
    <div
      className='text-center'
      onMouseOver={handleHover}
      onMouseOut={() => (!updating ? handleHover(null) : false)}
      onClick={handleClick}
    >
      {[...Array(+numStars).keys()].map((n) => {
        return (
          <Star
            key={`${id}-star-${n}`}
            starId={n + 1}
            selected={selection ? selection > n : rating > n}
          />
        )
      })}
    </div>
  )
}

export default StarRating
