import { useState } from 'react'
import useStore from '@/helpers/store'
import useRatingStore from '@/helpers/store/rating'
import Star from './Star'

const KEY = 'star-id'
const NUM_STARS = 5

const StarRating = ({ id }) => {
  const { user } = useStore()
  const { rating, addRating } = useRatingStore()
  const [selection, setSelection] = useState(0)
  const [updating, setUpdating] = useState(false)

  const handleHover = (e) => {
    let starId = 0
    if (e && e.target && e.target.getAttribute(KEY)) {
      starId = e.target.getAttribute(KEY)
    }
    setSelection(starId)
  }

  const handleClick = async () => {
    setUpdating(true)
    await addRating(selection, user, id)
    setUpdating(false)
  }

  return (
    <div
      className='flex ml-1'
      onMouseOver={handleHover}
      onMouseOut={() => (!updating ? handleHover(null) : false)}
      onClick={handleClick}
    >
      {[...Array(+NUM_STARS).keys()].map((n) => {
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
