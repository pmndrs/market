import { useEffect, useState } from 'react'

const Views = ({ id }) => {
  const [views, setViews] = useState(null)
  useEffect(() => {
    fetch(`/api/views?id=${id}`)
      .then((rsp) => rsp.json())
      .then((data) => setViews(data.views))
  }, [id])

  return (
    <span className='flex items-center'>
      <span className='pr-2 text-gray-600 '>Views: </span>{' '}
      <span className='inline-flex font-bold'>
        <span>{views}</span>
      </span>
    </span>
  )
}

export default Views
