import { Auth } from '@supabase/ui'
import { supabase } from '../helpers/initSupabase'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Index = ({ user, authView }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  if (user) {
    router.push('/')
  }
  const signUp = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signIn(
      {
        email,
        password,
      },
      {
        redirectTo: 'http://localhost:3000',
      }
    )

    if (error) {
      setError(error.message)
    }
  }
  return (
    <Layout title='Sign In' center>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={signUp}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 appearance-none rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 appearance-none rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
            </div>
            {error && (
              <div className='text-sm'>
                <p className='font-medium text-red-600 text-center'>{error}</p>
              </div>
            )}

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='relative items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'
              >
                Sign in
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 text-gray-500 bg-white'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <div>
                <button
                  onClick={async () => {
                    await supabase.auth.signIn({
                      provider: 'github',
                    })
                  }}
                  href='#'
                  className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                >
                  <span className='sr-only'>Sign in with GitHub</span>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='m-auto mt-5 max-w-[600px]'>
        <Auth
          className='login-component'
          supabaseClient={supabase}
          providers={['github']}
          view={authView}
          socialButtonSize='xlarge'
        />
      </div> */}
    </Layout>
  )
}

export default Index
