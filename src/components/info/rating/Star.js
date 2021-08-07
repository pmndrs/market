const Star = ({ starId, selected }) => {
  return (
    <button star-id={starId} className='text-yellow-400 sm:text-base'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-6 h-6'
        fill={selected ? 'currentColor' : 'none'}
        viewBox='0 0 24 24'
        stroke='currentColor'
        star-id={starId}
      >
        <path
          star-id={starId}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 3a1 1 0 012 0l1.5 4.6a1 1 0 001 .7h4.8A1 1 0 0121 10L17 13a1 1 0 00-.3 1.1l1.5 4.7a1 1 0 01-1.5 1.1l-4-2.9a1 1 0 00-1.2 0l-4 2.9A1 1 0 016 18.8L7.4 14a1 1 0 00-.3-1.1L3 10a1 1 0 01.6-1.8h4.9a1 1 0 001-.7L11 2.9z'
        />
      </svg>
    </button>
  )
}

export default Star
