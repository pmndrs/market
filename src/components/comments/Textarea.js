const Textarea = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='comment' className='sr-only'>
        Comment
      </label>
      <textarea
        id='comment'
        name='comment'
        rows={3}
        className='block w-full text-gray-800 bg-white border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
        placeholder='Add a comment'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Textarea
