const Size = ({ size }) => (
  <span className='flex items-center'>
    <span className='pr-2 text-gray-600 '>Size: </span>{' '}
    <span className='inline-flex font-bold'>
      <span>{size}</span>
    </span>
  </span>
)

export default Size
