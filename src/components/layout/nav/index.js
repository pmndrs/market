import PopOverMenu from '../PopOverMenu'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../../Logo'
import Link from 'next/link'
import useStore from '@/helpers/store'
import useNav from './useNav'
import UserMenu from './UserMenu'
import classNames from '@/helpers/classNames'

const Nav = () => {
  const { user } = useStore((state) => ({
    user: state.user,
  }))
  const [dropdownMenus, navigation, mobileNav] = useNav()

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
                      <Logo width='70' />
                    </a>
                  </Link>
                </div>
                <div className='items-center hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {Object.values(dropdownMenus).map((menu, i) => (
                    <PopOverMenu
                      key={menu}
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
              <UserMenu user={user} />
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
