import CreatorInfo from './CreatorInfo'

const Creators = ({ creator, team }) => (
  <>
    <div>
      <span className='text-gray-600'>Created by: </span>
      {Array.isArray(creator) ? (
        creator.map((c, i) => (
          <>
            <CreatorInfo {...c} />
            {i < creator.length - 1 && ', '}
          </>
        ))
      ) : (
        <CreatorInfo {...creator} />
      )}
    </div>

    {team && (
      <div>
        <span className='text-gray-600'>Team: </span>
        <a
          target='_blank'
          href={team.link}
          rel='noreferrer'
          className='font-bold'
        >
          {team.name}
        </a>
      </div>
    )}
  </>
)

export default Creators
