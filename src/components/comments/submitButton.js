const SubmitButton = ({ children, className }) => {
  return (
    <button
      type='submit'
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  )
}

export default SubmitButton
