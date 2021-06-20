import PopOverMenu from '../PopOverMenu'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../../Logo'
import Link from 'next/link'
import useStore from '@/helpers/store'
import useNav from './useNav'
import UserMenu from './UserMenu'
import classNames from '@/helpers/classNames'
import nightwind from 'nightwind/helper'
import Tippy from '@tippyjs/react'

const Nav = () => {
  const { user, darkMode } = useStore((state) => ({
    user: state.user,
    darkMode: state.darkMode,
  }))
  const [dropdownMenus, navigation, mobileNav] = useNav()

  const toggleDarkMode = () => {
    nightwind.toggle()
    useStore.setState({
      darkMode: !darkMode,
    })
  }

  return (
    <Disclosure as='nav' className='bg-white border-b border-gray-200'>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/'>
                    <a aria-label='Go Home'>
                      <Logo width='70' darkMode={darkMode} />
                    </a>
                  </Link>
                </div>

                <div className='items-center hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {Object.values(dropdownMenus).map((menu, i) => (
                    <PopOverMenu
                      key={i}
                      menu={menu}
                      title={Object.keys(dropdownMenus)[i]}
                    />
                  ))}

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
              <div className='flex gap-2'>
                <Tippy content='Toggle Dark Mode'>
                  <button onClick={toggleDarkMode} className='text-gray-400'>
                    {darkMode ? (
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
                          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                        />
                      </svg>
                    ) : (
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
                          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                        />
                      </svg>
                    )}
                  </button>
                </Tippy>
                <UserMenu user={user} />
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
              {mobileNav.map((item) => (
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
