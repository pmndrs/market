const DownloadButton = ({ children, onClick, ...props }) => {
  if (props.href) {
    return (
      <a
        className='block w-full py-2 mt-4 text-center text-white bg-gray-800 disabled:opacity-75 disabled:cursor-auto'
        download
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className='block w-full py-2 mt-4 text-center text-white bg-gray-800 disabled:opacity-75 disabled:cursor-auto'
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default DownloadButton
