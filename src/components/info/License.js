import { licenses } from '@/helpers/constants/licenses'

const License = ({ license }) => (
  <span className='block'>
    <span className='text-gray-600'>License: </span>{' '}
    {licenses[license] ? (
      <a
        target='_blank'
        href={licenses[license].link}
        rel='noreferrer'
        className='font-bold'
      >
        {licenses[license].name}
      </a>
    ) : (
      <span className='font-bold'>{license}</span>
    )}
  </span>
)

export default License
