import { useState } from 'react'

const ModelRequestForm = ({ onSubmit }) => {
  const [request, setRequest] = useState('')
  const [description, setDescription] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ request, description })
      }}
    >
      <div>
        <label
          htmlFor='request'
          className='block text-sm font-medium text-gray-700'
        >
          What is the model?
        </label>
        <div className='mt-1'>
          <input
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            type='text'
            name='request'
            required
            id='request'
            className='block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            placeholder='A spaceship'
          />
        </div>
        <div className='mt-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Anything else you can tell us? Examples?
          </label>
          <div className='mt-1'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              name='description'
              id='description'
              className='block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            ></textarea>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='relative items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'
      >
        Request
      </button>
    </form>
  )
}

export default ModelRequestForm
