import useStore from '@/helpers/store'
import Layout from '@/components/layout/'
import { SearchIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import getAllMatcaps from '@/helpers/getAllMatcaps'
import Link from 'next/link'

const Index = ({ title, colors, matcaps }) => {
  useEffect(() => {
    useStore.setState({ title })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout title={'All Matcaps'}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {matcaps.map((matcap, i) => (
          <li key={matcap.image} className='relative'>
            <Link
              className='absolute inset-0 focus:outline-none'
              href={`/matcap/${matcap.url}`}
            >
              <a>
                <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
                  <img
                    src={matcap.preview}
                    alt=''
                    className='object-cover pointer-events-none group-hover:opacity-75'
                  />
                </div>
                <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
                  {matcap.info?.name}
                </p>
                <p className='flex block text-sm font-medium text-gray-500'>
                  {matcap.size}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export default Index

export async function getStaticProps() {
  const matcaps = getAllMatcaps()

  return {
    props: {
      matcaps,
      title: 'Matcaps',
    },
  }
}
