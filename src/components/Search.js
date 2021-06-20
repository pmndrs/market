import { SearchIcon } from '@heroicons/react/solid'

const Search = ({ search, setSearch, onOrderChange, assetName }) => {
  const placeholder = `Search for ${assetName}`
  return (
    <div className='items-center block mt-6 sm:flex gap-10'>
      <label htmlFor='search' className='sr-only'>
        {placeholder}
      </label>
      <div className='relative flex-grow rounded-md shadow-sm'>
        <input
          type='search'
          name='search'
          id='search'
          value={search}
          onChange={setSearch}
          className='block w-full pr-10 text-gray-800 bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          placeholder={placeholder}
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <SearchIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </div>
      </div>
      <div className='mt-4 min-w-[200px] sm:mt-0'>
        <label htmlFor='order' className='sr-only'>
          Order By
        </label>
        <select
          id='order'
          name='order'
          className='block w-full py-2 pl-3 pr-10 text-base text-gray-800 bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          onChange={(e) => onOrderChange(e.target.value)}
        >
          <option value='alphabetic'>Order By</option>
          <option value='size'>Size</option>
          <option value='added'>Last Added</option>
          <option value='views'>Views</option>
          <option value='alphabetic'>Alphabetic</option>
        </select>
      </div>
    </div>
  )
}

export default Search
