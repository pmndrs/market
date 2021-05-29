import useStore from '@/helpers/store'
import useCommentsStore from '@/helpers/store/comments'
import { addHours, formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import Modal from './deleteModal'

const Comment = ({ profiles, comment, created_at, id }) => {
  const { user } = useStore()
  const { deleteComment } = useCommentsStore()
  const [modalOpen, setModalOpen] = useState(false)
  // im so sorry, dates are hard
  const date = formatDistanceToNow(addHours(new Date(created_at), 2), {
    addSuffix: true,
  })
  const isCommentCreator = user && user.id === profiles.user_id
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
      {isCommentCreator && (
        <>
          <div className='flex pl-3 mt-1 ml-10'>
            <button className='mr-2 text-sm font-medium text-indigo-700'>
              Edit
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className='text-sm font-medium text-indigo-700'
            >
              Delete
            </button>
          </div>
          {modalOpen && (
            <Modal
              onClickDelete={() => deleteComment(id)}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </>
      )}
    </li>
  )
}

export default Comment
