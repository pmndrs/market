const Views = ({ views }) => {
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
