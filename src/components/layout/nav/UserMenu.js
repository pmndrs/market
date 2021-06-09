import classNames from '@/helpers/classNames'
import { supabase } from '@/helpers/initSupabase'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

const UserMenu = ({ user }) => {
  return (
    <div className='hidden sm:ml-6 sm:flex sm:items-center'>
      {user ? (
        <Menu as='div' className='relative ml-3'>
          {({ open }) => (
            <>
              <div>
                <Menu.Button className='flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='w-8 h-8 rounded-full'
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name}
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  static
                  className='absolute right-0 w-48 py-1 mt-2 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]'
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href='/favorites'>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-center'
                          )}
                        >
                          Favorites
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href='/add-asset'>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-center'
                          )}
                        >
                          Add your asset
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href='/creator-dashboard'>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-center'
                          )}
                        >
                          Creator Dashboard
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  {user.profile.admin && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/admin-dashboard'>
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 w-full text-center'
                            )}
                          >
                            Admin Dashboard
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {() => (
                      <a
                        href='https://documenter.getpostman.com/view/476520/TzRUC7y1'
                        className={
                          'block px-4 py-2 text-sm text-gray-700 w-full text-center'
                        }
                        target='_blank'
                        rel='noreferrer'
                      >
                        API Docs
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => supabase.auth.signOut()}
                        href='#'
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700 w-full'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      ) : (
        <Link href='/login'>
          <a className='relative items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'>
            Sign In
          </a>
        </Link>
      )}
    </div>
  )
}

export default UserMenu
