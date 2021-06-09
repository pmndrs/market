import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function FileDrop({
  onChange,
  accept = 'image/*',
  showPreview = true,
  maxSize = 1000000,
  label,
  description,
}) {
  const [preview, setPreview] = useState(null)
  const [success, setSuccess] = useState(false)
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    maxFiles: 1,
    maxSize,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setSuccess(true)
      if (acceptedFiles && acceptedFiles[0]) {
        onChange(acceptedFiles[0])
        showPreview && setPreview(URL.createObjectURL(acceptedFiles[0]))
      }
    },
  })

  const style = useMemo(
    () => ({
      ...(isDragActive
        ? {
            borderColor: '#2196f3',
          }
        : {}),
      ...(isDragAccept
        ? {
            borderColor: '#00e676',
          }
        : {}),
      ...(isDragReject
        ? {
            borderColor: '#ff1744',
          }
        : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const thumbs = preview && (
    <div className='inline-flex w-full h-auto my-4 rounded'>
      <div className='flex w-full min-h-0 overflow-hidden rounded'>
        <img src={preview} alt='' className='block w-full h-auto m-auto' />
      </div>
    </div>
  )

  return (
    <section>
      <label
        htmlFor='upload'
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      {description && (
        <span className='block my-1 text-xs font-medium text-gray-500'>
          {description}
        </span>
      )}
      <div
        {...getRootProps({
          className:
            'mt-1 flex flex-1 rounded outline-none text-gray-800 p-8 bg-gray-100 items-center flex-col border-2 border-dashed border-gray-200 transition-all',
          style,
        })}
      >
        <input id='upload' {...getInputProps()} />
        <p className='p-0 m-0'>
          {!success
            ? "Drag 'n' drop a file here, or click a file"
            : 'Thank you'}
        </p>
      </div>
      <aside className='flex flex-row flex-wrap mt-6'>{thumbs}</aside>
    </section>
  )
}

export default FileDrop
