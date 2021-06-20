import { supabase } from '@/helpers/initSupabase'
import useStore from '@/helpers/store/'
import useRequestsStore from '@/helpers/store/requests'
import Tippy from '@tippyjs/react'
import Link from 'next/link'
import Button from '../Button'

const Request = (request) => {
  const user = useStore((s) => s.user)

  const vote = useRequestsStore((s) => s.vote)

  const closeRequest = async () => {
    var id = window.prompt('What is the id?', '')
    if (id) {
      await supabase
        .from('requests')
        .update({ closed: true, closedBy: id })
        .match({ id: request.id })
    }
  }

  return (
    <li>
      <div className={`flex items-center justify-between relative`}>
        {request.closed && (
          <Link href={`/${request.closedBy}`}>
            <a
              style={{ transform: 'translateX(-50%) translateY(-50%)' }}
              className='absolute font-bold text-gray-800 underline top-[50%] left-[50%]'
            >
              closed by {request.closedBy.split('/')[1]}
            </a>
          </Link>
        )}
        <div className='px-4 py-4 sm:px-6 '>
          <div
            className={`flex items-center ${request.closed && 'opacity-40'} `}
          >
            <div className='flex items-center flex-shrink-0 mr-6'>
              <Tippy
                disabled={user && !request.upvotes.includes(user?.id)}
                content={
                  user
                    ? 'You have already voted'
                    : 'You need an account to vote'
                }
              >
                <div>
                  <button
                    className='text-green-600 disabled:text-gray-300 disabled:cursor-default'
                    disabled={!user || request.upvotes.includes(user?.id)}
                    onClick={() => vote(request.id, request.upvotes, user.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 15l7-7 7 7'
                      />
                    </svg>
                  </button>
                </div>
              </Tippy>
              <p className='inline-flex px-2 text-lg font-bold text-gray-800 leading-5'>
                {request.upvotes.length}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium text-indigo-600 truncate'>
                {request.request}
              </p>
              <p className='block mt-2 text-xs text-gray-800 truncate'>
                {request.description}
              </p>
            </div>
          </div>
        </div>
        <p
          className={`block mr-10 text-xs text-gray-800 truncate ${
            request.closed && 'opacity-40'
          }`}
        >
          {user?.profile && user.profile.admin && !request.closed && (
            <Button className='mr-5' onClick={closeRequest}>
              Close
            </Button>
          )}
          <span className='inline-flex items-center px-3 mr-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full py-0.5'>
            {request.category || 'Model'}
          </span>
          {new Date(request.created).toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })}
        </p>
      </div>
    </li>
  )
}

export default Request
