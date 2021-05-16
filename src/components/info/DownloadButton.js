const DownloadButton = ({ children, onClick, href, ...props }) => {
  if (href) {
    return (
      <a
        className='block w-full py-2 text-center text-white bg-gray-800'
        download
        href={href}
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className='block w-full py-2 mt-4 text-center text-white bg-gray-800'
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default DownloadButton
