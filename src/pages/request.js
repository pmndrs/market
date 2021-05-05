import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import AssetRequestForm from '@/components/AssetRequestForm'
import { useEffect } from 'react'
import Tippy from '@tippyjs/react'

const Request = ({ user, requests: requestsServer }) => {
  const { requesting, vote, submitRequest, setRequests, requests } = useStore(
    (s) => ({
      requesting: s.requesting,
      submitRequest: s.submitRequest,
      setRequests: s.setRequests,
      requests: s.requests,
      vote: s.vote,
    })
  )

  useEffect(() => {
    setRequests(requestsServer)
  }, [requestsServer, setRequests])

  return (
    <Layout title={'Model Requests'}>
      {user && (
        <>
          <div className='flex justify-end'>
            <button
              onClick={() => useStore.setState({ requesting: !requesting })}
              className='relative items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'
            >
              Request an Asset
            </button>
          </div>
          {requesting && <AssetRequestForm onSubmit={submitRequest} />}
        </>
      )}
      <div className='mt-10 overflow-hidden bg-white shadow sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {requests.map((request) => (
            <li key={request.id}>
              <div className='flex items-center justify-between'>
                <div className='px-4 py-4 sm:px-6'>
                  <div className='flex items-center'>
                    <div className='flex items-center flex-shrink-0 mr-6'>
                      <Tippy
                        content={
                          user
                            ? 'You have already voted'
                            : 'You need an account to vote'
                        }
                      >
                        <div>
                          <button
                            className='text-green-600 disabled:text-gray-300 disabled:cursor-default'
                            disabled={
                              !user || request.upvotes.includes(user?.id)
                            }
                            onClick={() => vote(request.id, request.upvotes)}
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
                      <p className='inline-flex px-2 text-lg font-bold leading-5'>
                        {request.upvotes.length}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-indigo-600 truncate'>
                        {request.request}
                      </p>{' '}
                      <p className='block mt-2 text-xs text-gray-800 truncate'>
                        {request.description}
                      </p>
                    </div>
                  </div>
                </div>
                <p className='block mr-10 text-xs text-gray-800 truncate'>
                  <span className='inline-flex items-center px-3 mr-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full py-0.5'>
                    {request.category}
                  </span>
                  {new Date(request.created).toLocaleString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Request

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const { data } = await supabase.from('requests').select()
  const requests = data.sort((a, b) => a.upvotes.length > b.upvotes.length)

  return { props: { user, requests } }
}
