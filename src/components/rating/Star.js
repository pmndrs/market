const Star = ({ starId, selected }) => {
  return (
    <span
      star-id={starId}
      role='button'
      className='text-3xl sm:text-4xl md:text-5xl'
      style={{ color: '#4338ca', cursor: 'pointer' }}
    >
      {selected ? '\u2605' : '\u2606'}
    </span>
  )
}

export default Star
