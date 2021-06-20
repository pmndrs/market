import useStore from '@/helpers/store'
import useCommentsStore from '@/helpers/store/comments'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import Tippy from '@tippyjs/react'
import SubmitButton from './submitButton'
import Textarea from './Textarea'

const AddACommentForm = ({ assetId }) => {
  const { user } = useStore()
  const { currentComment, createComment } = useCommentsStore()

  if (!user) return null
  return (
    <div className='px-4 py-6 bg-gray-50 sm:px-6 dark:bg-gray-800 '>
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
            <Textarea
              value={currentComment}
              onChange={(currentComment) =>
                useCommentsStore.setState({
                  currentComment,
                })
              }
            />

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

              <SubmitButton>Comment</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddACommentForm
