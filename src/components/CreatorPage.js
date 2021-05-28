import Asset from './Asset'
import Layout from './layout'

const CreatorPage = ({ title, creator }) => {
  return (
    <Layout title={title} noTitle>
      <div className='flex items-center'>
        <img
          className='w-20 h-20 mr-4 rounded'
          src={creator.logo}
          alt={creator.name}
        />
        <div>
          <h1 className={`text-3xl font-bold leading-tight text-gray-900 `}>
            {title}
          </h1>
          <a
            href={creator.link}
            target='blank'
            className='flex items-center mt-1 text-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 mr-1 text-gray-900'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>{' '}
            Visit Website
          </a>
        </div>
      </div>

      {creator.models.length ? (
        <>
          <h2 className='mt-12 text-xl font-medium text-gray-900'>Models</h2>
          <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
            {creator.models.map((model, i) => (
              <Asset {...model} key={i} />
            ))}
          </ul>
        </>
      ) : null}
      {creator.materials.length ? (
        <>
          <h2 className='mt-12 text-xl font-medium text-gray-900'>Materials</h2>
          <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
            {creator.materials.map((material, i) => (
              <Asset {...material} key={i} />
            ))}
          </ul>
        </>
      ) : null}
      {creator.hdris.length ? (
        <>
          <h2 className='mt-12 text-xl font-medium text-gray-900'>HDRI's</h2>
          <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
            {creator.hdris.map((hdri, i) => (
              <Asset {...hdri} key={i} />
            ))}
          </ul>
        </>
      ) : null}
    </Layout>
  )
}

export default CreatorPage
