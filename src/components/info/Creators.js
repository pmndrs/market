import Link from 'next/link'
import CreatorInfo from './CreatorInfo'

const Creators = ({ creator, team }) => (
  <>
    <div>
      <span className='text-gray-600'>Created by: </span>
      {!creator.url ? (
        Array.isArray(creator) ? (
          creator.map((c, i) => (
            <>
              <CreatorInfo {...c} />
              {i < creator.length - 1 && ', '}
            </>
          ))
        ) : (
          <CreatorInfo {...creator} />
        )
      ) : (
        <Link href={`/creator/${creator.url}`}>
          <a className='font-bold'>{creator.name}</a>
        </Link>
      )}
    </div>

    {team && (
      <div>
        <span className='text-gray-600'>Team: </span>
        {!team.url ? (
          <a
            target='_blank'
            href={team.link}
            rel='noreferrer'
            className='font-bold'
          >
            {team.name}
          </a>
        ) : (
          <Link href={`/team/${team.url}`}>
            <a className='font-bold'>{team.name}</a>
          </Link>
        )}
      </div>
    )}
  </>
)

export default Creators
