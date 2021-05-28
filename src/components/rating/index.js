import { useRef } from 'react'
import useStore from '@/helpers/store'
import useRatingStore from '@/helpers/store/rating'

const numStars = 5
const Rating = () => {
  const ratingContainer = useRef()
  const { user } = useStore()
  const { rating, currentUserRating, addRating } = useRatingStore()

  const setRating = (e) => {
    const stars = e.target.getElementsByClassName('star')
    Array.from(stars).forEach((star) => {
      star.style.color = rating >= star.dataset.value ? 'yellow' : 'gray'
    })
  }

  const handleHover = (e) => {
    const stars = e.target.parentElement.getElementsByClassName('star')
    const hoverValue = e.target.dataset.value
    Array.from(stars).forEach((star) => {
      star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray'
    })
  }

  const handleClick = (e) => {
    let newRating = e.target.dataset.value
    addRating(user, newRating)
  }

  return (
    <div
      ref={ratingContainer}
      className='rating'
      data-rating={currentUserRating}
      onMouseOut={setRating}
    >
      {[...Array(+numStars).keys()].map((n) => {
        return (
          <span
            className='star'
            key={n + 1}
            data-value={n + 1}
            onMouseOver={handleHover}
            onClick={handleClick}
          >
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Rating
