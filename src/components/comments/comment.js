import { addHours, formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'

const Comment = ({ profiles, comment, created_at }) => {
  // im so sorry, dates are hard
  const date = formatDistanceToNow(addHours(new Date(created_at), 2), {
    addSuffix: true,
  })
  return (
    <li>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          <img
            className='w-10 h-10 rounded-full'
            src={profiles.avatar}
            alt={profiles.name}
          />
        </div>
        <div>
          <span className='text-sm font-medium text-gray-900'>
            {profiles.name}
          </span>
          <div className='mt-1 text-sm text-gray-700'>
            <ReactMarkdown disallowedElements={['img']}>
              {comment}
            </ReactMarkdown>
          </div>
          <span className='mt-2 text-sm font-medium text-gray-500 space-x-2'>
            {date}
          </span>
        </div>
      </div>
    </li>
  )
}

export default Comment
