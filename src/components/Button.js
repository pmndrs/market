const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`relative items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
