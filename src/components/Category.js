import Link from 'next/link'

const item = (items) => items[Math.floor(Math.random() * items.length)]

const Category = (category) => {
  return (
    <li className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/${category.material ? 'materials' : 'models'}/categories/${
          category.name
        }`}
      >
        <a>
          <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
            <img
              src={`https://api.market.pmnd.rs${
                category.material
                  ? item(category.materials).preview
                  : item(category.models).image
              }`}
              alt={category.name}
              className='object-cover pointer-events-none group-hover:opacity-75'
            />
            <p className='absolute flex items-center justify-center font-bold text-gray-900 uppercase truncate bg-white pointer-events-none bg-opacity-40'>
              <span>{category.name}</span>
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default Category
