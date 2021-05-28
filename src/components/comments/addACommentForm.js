import useStore from '@/helpers/store'
import useCommentsStore from '@/helpers/store/comments'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import Tippy from '@tippyjs/react'

const AddACommentForm = ({ assetId }) => {
  const { user } = useStore()
  const { currentComment, createComment } = useCommentsStore()

  if (!user) return null
  return (
    <div className='px-4 py-6 bg-gray-50 sm:px-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          <img
            className='w-10 h-10 rounded-full'
            src={user.profile.avatar}
            alt={user.profile.name}
          />
        </div>
        <div className='flex-1 min-w-0'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              createComment(user, assetId)
            }}
          >
            <div>
              <label htmlFor='comment' className='sr-only'>
                Comment
              </label>
              <textarea
                id='comment'
                name='comment'
                rows={3}
                className='block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                placeholder='Add a comment'
                value={currentComment}
                onChange={(e) =>
                  useCommentsStore.setState({
                    currentComment: e.target.value,
                  })
                }
              />
            </div>
            <div className='flex items-center justify-between mt-3'>
              <div className='inline-flex items-start text-sm text-gray-500 group space-x-2 hover:text-gray-900'>
                <Tippy content='Headings and Lists will not be styled and images are not allowed'>
                  <div>
                    <QuestionMarkCircleIcon
                      className='flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </div>
                </Tippy>
                <span>Some Markdown is okay.</span>
              </div>

              <button
                type='submit'
                className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddACommentForm
