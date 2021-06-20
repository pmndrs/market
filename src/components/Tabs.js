import classNames from '@/helpers/classNames'

const Tabs = ({ tabs }) => {
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          name='tabs'
          className='block w-full py-2 pl-3 pr-10 text-base bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(e) =>
            tabs
              .find((tab) => tab.name === e.target.value)
              .onClick(e.target.value)
          }
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={tab.onClick}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:border-none',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm '
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Tabs
