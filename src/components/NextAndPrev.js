import Link from 'next/link'

const NextAndPrev = (asset) => {
  return asset.prev || asset.next ? (
    <div className='flex justify-between mt-20'>
      {asset.prev && (
        <div className=''>
          <h5 className='mb-2 text-xs font-bold text-gray-600 uppercase leading-4'>
            Previous
          </h5>
          <div className='text-xl capitalize'>
            <Link href={'/' + asset.prev.id}>
              <a className='text-gray-900'>{asset.prev.name}</a>
            </Link>
          </div>
        </div>
      )}

      {asset.next && (
        <div className='ml-auto text-right'>
          <h5 className='mb-2 text-xs font-bold text-gray-600 uppercase leading-4'>
            Next
          </h5>
          <div className='text-xl capitalize'>
            <Link href={'/' + asset.next.id}>
              <a className='text-gray-900'>{asset.next.name}</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default NextAndPrev
