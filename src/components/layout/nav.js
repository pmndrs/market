import { Fragment } from 'react'
import PopOverMenu from './PopOverMenu'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/helpers/initSupabase'
import useStore from '@/helpers/store'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = () => {
  const { pathname } = useRouter()
  const { user } = useStore((state) => ({
    user: state.user,
  }))

  const models = [
    { name: 'All Models', href: '/' },
    {
      name: 'Categories',
      href: '/models/categories',
    },
  ]

  const materials = [
    { name: 'All Materials', href: '/materials' },
    {
      name: 'Categories',
      href: '/materials/categories',
    },
  ]

  const navigation = [
    {
      name: 'Request an Asset',
      href: '/request',
      current: pathname === '/request',
    },
  ]

  return (
    <Disclosure as='nav' className='bg-white border-b border-gray-200'>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/'>
                    <a>
                      <Logo width='70' />
                    </a>
                  </Link>
                </div>
                <div className='items-center hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  <PopOverMenu menu={models} title='Models' />
                  <PopOverMenu menu={materials} title='Materials' />
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? 'text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center px-1 pt-1 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
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
                            className='absolute right-0 w-48 py-1 mt-2 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none'
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link href='favorites'>
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
              <div className='flex items-center -mr-2 sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
