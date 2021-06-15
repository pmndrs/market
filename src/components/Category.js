import Link from 'next/link'

const Category = (category) => {
  const thumb = category[category.type][0].thumbnail
  return (
    <li className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/${category.type}/categories/${category.name}`}
      >
        <a>
          <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
            <img
              src={thumb}
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
