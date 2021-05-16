import Link from 'next/link'

const Category = ({ category, path }) => {
  return category ? (
    <>
      <span className='text-gray-600'>Category: </span>
      <Link href={`/${path}/categories/${category}`}>
        <a className='inline-flex items-center px-2 mt-1 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'>
          {category}
        </a>
      </Link>
    </>
  ) : null
}

export default Category
