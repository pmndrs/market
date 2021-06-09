const Input = ({ label, id, value, onChange, Error }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='mt-1'>
        <input
          id={id}
          name={id}
          type='text'
          className='block w-full border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {Error && <Error />}
    </div>
  )
}

export default Input
