import useAddAssetStore from '@/helpers/store/addAsset'
import Link from 'next/link'

const Step3 = () => {
  const { loadingText, createdAsset, uploadingError } = useAddAssetStore()
  return (
    <div className='text-center'>
      <p className='mt-6 text-xl'>{loadingText}...</p>
      {createdAsset && (
        <>
          {uploadingError ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-12 h-12 m-auto mb-4 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-12 h-12 m-auto mb-4 text-green-600'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {!uploadingError && (
            <>
              <Link href={`/${createdAsset}`}>
                <a className='font-bold'>You can go check your asset</a>
              </Link>
              <p className='m-auto mt-4 text-sm max-w-[300px]'>
                Your asset will be reviewed to be a part of the website, you can
                check the status in{' '}
                <Link href={`/creator-dashboard`}>
                  <a>your creator dashboard</a>
                </Link>
                .
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Step3
