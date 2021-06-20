import useCommentsStore from '@/helpers/store/comments'
import { useEffect } from 'react'
import AddACommentForm from './addACommentForm'
import Comment from './comment'

const Comments = ({ id }) => {
  const { comments, getComments } = useCommentsStore()

  useEffect(() => {
    getComments(id)
  }, [id, getComments])

  return (
    <section aria-labelledby='comments-title'>
      <h2
        id='comments-title'
        className='py-6 text-lg font-medium text-gray-900 leading-6'
      >
        Comments
      </h2>
      <div className='shadow sm:rounded-lg sm:overflow-hidden dark:border dark:border-gray-800'>
        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          <div className='px-4 py-6 sm:px-6'>
            <ul className='space-y-8'>
              {comments.length ? (
                comments.map((comment) => (
                  <Comment {...comment} key={comment.id} />
                ))
              ) : (
                <h2 className='py-6 text-lg font-medium text-center text-gray-900 leading-6'>
                  No comments yet 😞
                </h2>
              )}
            </ul>
          </div>
        </div>
        <AddACommentForm assetId={id} />
      </div>
    </section>
  )
}

export default Comments
