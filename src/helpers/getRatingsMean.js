const getRatingsMean = (arr) => {
  return Math.round(
    arr.reduce((acc, { rating }) => acc + parseInt(rating), 0) / arr.length
  )
}

export default getRatingsMean
