import useStore from '@/helpers/store'
import Head from 'next/head'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export function LogoFull({ color = 'black', ...props }) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 276 50'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M77.5107 38H82.1218V29.3991H86.994C92.8729 29.3991 96.0298 25.8693 96.0298 20.9723C96.0298 16.1126 92.9102 12.5455 87.0561 12.5455H77.5107V38ZM82.1218 25.6083V16.3984H86.3477C89.8029 16.3984 91.3317 18.2628 91.3317 20.9723C91.3317 23.6818 89.8029 25.6083 86.3725 25.6083H82.1218ZM107.89 38.3729C113.483 38.3729 117.038 34.4329 117.038 28.5291C117.038 22.6129 113.483 18.6605 107.89 18.6605C102.297 18.6605 98.7425 22.6129 98.7425 28.5291C98.7425 34.4329 102.297 38.3729 107.89 38.3729ZM107.915 34.7685C104.82 34.7685 103.304 32.0092 103.304 28.5167C103.304 25.0241 104.82 22.2276 107.915 22.2276C110.96 22.2276 112.476 25.0241 112.476 28.5167C112.476 32.0092 110.96 34.7685 107.915 34.7685ZM120.857 38H125.356V18.9091H120.857V38ZM123.119 16.1996C124.548 16.1996 125.716 15.1058 125.716 13.7635C125.716 12.4087 124.548 11.315 123.119 11.315C121.677 11.315 120.509 12.4087 120.509 13.7635C120.509 15.1058 121.677 16.1996 123.119 16.1996ZM129.983 38H134.482V26.3913C134.482 24.0423 136.048 22.4513 137.987 22.4513C139.889 22.4513 141.194 23.7315 141.194 25.6953V38H145.606V26.093C145.606 23.9428 146.886 22.4513 149.061 22.4513C150.876 22.4513 152.318 23.5202 152.318 25.8817V38H156.829V25.1857C156.829 20.9226 154.368 18.6605 150.863 18.6605C148.092 18.6605 145.979 20.0277 145.134 22.1531H144.935C144.201 19.9904 142.35 18.6605 139.777 18.6605C137.216 18.6605 135.302 19.978 134.507 22.1531H134.283V18.9091H129.983V38ZM166.887 38.3853C169.883 38.3853 171.673 36.9808 172.493 35.3775H172.642V38H176.967V25.223C176.967 20.1768 172.853 18.6605 169.212 18.6605C165.197 18.6605 162.115 20.4503 161.12 23.9304L165.321 24.527C165.769 23.2219 167.037 22.1033 169.237 22.1033C171.325 22.1033 172.468 23.1722 172.468 25.049V25.1236C172.468 26.4162 171.113 26.4783 167.745 26.8388C164.041 27.2365 160.499 28.3427 160.499 32.6431C160.499 36.3967 163.246 38.3853 166.887 38.3853ZM168.056 35.0792C166.179 35.0792 164.837 34.2216 164.837 32.5685C164.837 30.8409 166.341 30.12 168.354 29.8342C169.535 29.6726 171.896 29.3743 172.48 28.902V31.1516C172.48 33.277 170.765 35.0792 168.056 35.0792ZM185.991 26.8139C185.991 24.0547 187.656 22.4638 190.03 22.4638C192.354 22.4638 193.746 23.9925 193.746 26.5405V38H198.246V25.8445C198.258 21.2706 195.648 18.6605 191.708 18.6605C188.849 18.6605 186.886 20.0277 186.016 22.1531H185.792V18.9091H181.491V38H185.991V26.8139ZM209.904 38.3356C213.185 38.3356 214.664 36.3842 215.373 34.9922H215.646V38H220.071V12.5455H215.559V22.0661H215.373C214.689 20.6864 213.285 18.6605 209.917 18.6605C205.504 18.6605 202.037 22.1158 202.037 28.4794C202.037 34.7685 205.405 38.3356 209.904 38.3356ZM211.159 34.6442C208.189 34.6442 206.623 32.0341 206.623 28.4545C206.623 24.8999 208.164 22.3519 211.159 22.3519C214.055 22.3519 215.646 24.7507 215.646 28.4545C215.646 32.1584 214.031 34.6442 211.159 34.6442ZM224.866 38H229.365V26.7766C229.365 24.353 231.192 22.6378 233.665 22.6378C234.423 22.6378 235.368 22.7745 235.753 22.8988V18.7599C235.343 18.6854 234.635 18.6357 234.138 18.6357C231.95 18.6357 230.123 19.8786 229.427 22.0909H229.228V18.9091H224.866V38ZM246.408 38.3729C250.858 38.3729 253.915 36.1978 254.711 32.8793L250.51 32.407C249.901 34.0227 248.409 34.8679 246.47 34.8679C243.562 34.8679 241.635 32.9538 241.598 29.685H254.897V28.3054C254.897 21.6062 250.87 18.6605 246.172 18.6605C240.703 18.6605 237.136 22.6751 237.136 28.5664C237.136 34.5572 240.653 38.3729 246.408 38.3729ZM241.61 26.6523C241.747 24.2163 243.549 22.1655 246.234 22.1655C248.819 22.1655 250.559 24.0547 250.584 26.6523H241.61ZM273.792 23.9553C273.171 20.7237 270.585 18.6605 266.111 18.6605C261.512 18.6605 258.38 20.9226 258.393 24.4524C258.38 27.2365 260.095 29.076 263.762 29.8342L267.018 30.5178C268.771 30.9031 269.591 31.6115 269.591 32.6928C269.591 33.9979 268.174 34.9798 266.036 34.9798C263.973 34.9798 262.631 34.0849 262.246 32.3697L257.858 32.7923C258.418 36.2972 261.363 38.3729 266.049 38.3729C270.822 38.3729 274.19 35.8995 274.202 32.2827C274.19 29.5607 272.437 27.8952 268.833 27.1122L265.577 26.4162C263.638 25.9812 262.867 25.31 262.88 24.2038C262.867 22.9112 264.296 22.0163 266.173 22.0163C268.249 22.0163 269.343 23.1474 269.691 24.4027L273.792 23.9553Z'
        fill='inherit'
      />
      <path
        d='M17.5 35H32.5V50H17.5V35ZM17.5 17.5H32.5V32.5H17.5V17.5ZM0 17.5H15V32.5H0V17.5Z'
        fill='inherit'
      />
      <path d='M35 0H17.5V15H35V32.5H50V0H35Z' fill='inherit' />
    </svg>
  )
}
const Dom = ({ children }) => {
  const events = useStore((s) => s.events)

  const navigation = [
    { name: 'All Models', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Header />
      <div className='absolute top-0 left-0 w-screen h-screen min-h-screen overflow-hidden bg-white children'>
        <Disclosure as='nav' className='bg-white border-b border-gray-200'>
          {({ open }) => (
            <>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                  <div className='flex'>
                    <div className='flex items-center flex-shrink-0'>
                      <LogoFull width='100' />
                    </div>
                    <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center -mr-2 sm:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XIcon className='block w-6 h-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block w-6 h-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='pt-2 pb-3 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
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
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className='py-10'>
          <header>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight text-gray-900'>
                All Models
              </h1>
            </div>
          </header>
          <main>
            <div
              className='relative px-6 mx-auto max-w-7xl lg:px-8'
              {...events}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dom
