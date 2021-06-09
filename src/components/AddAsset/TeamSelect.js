import { supabase } from '@/helpers/initSupabase'
import { slugify } from '@/helpers/slugify'
import useAddAssetStore from '@/helpers/store/addAsset'
import { useEffect, useState } from 'react'
import Input from '../Form/Input'

const TeamSelect = () => {
  const assetState = useAddAssetStore()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    supabase
      .from('teams')
      .select('id,name')
      .then((rsp) => setTeams(rsp.data))
  }, [])

  useEffect(() => {
    if (assetState.team.name) {
      useAddAssetStore.setState({
        team: {
          ...assetState.team,
          slug: slugify(assetState.team.name),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetState.team.name])

  return (
    <div>
      <p className='block text-sm font-medium text-gray-700'>Team</p>

      <div className='flex items-center mt-2'>
        <input
          onChange={(e) =>
            useAddAssetStore.setState({ partOfTeam: e.target.checked })
          }
          checked={assetState.partOfTeam}
          id='team'
          name='team'
          type='checkbox'
          className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
        />
        <label htmlFor='team' className='block ml-2 text-sm text-gray-900'>
          I am part of a team
        </label>
      </div>
      {assetState.partOfTeam && (
        <>
          <div className='mt-4'>
            <label
              htmlFor='team'
              className='block text-sm font-medium text-gray-700'
            >
              Select a team
            </label>
            <select
              id='team'
              name='team'
              className='block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              value={assetState.teamID}
              onChange={(e) =>
                useAddAssetStore.setState({
                  teamID: parseInt(e.target.value),
                })
              }
            >
              <option>Please select a team</option>
              {teams.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-4'>
            <span className='block mb-2 text-sm font-medium text-gray-700'>
              Or create a new one
            </span>
            <Input
              key='team-name'
              label='Name'
              value={assetState.team.name}
              onChange={(name) =>
                useAddAssetStore.setState({
                  team: {
                    ...assetState.team,
                    name,
                  },
                })
              }
            />
          </div>
          <div className='mt-2'>
            <Input
              key='team-link'
              label='Link'
              value={assetState.team.link}
              onChange={(link) =>
                useAddAssetStore.setState({
                  team: {
                    ...assetState.team,
                    link,
                  },
                })
              }
            />
          </div>{' '}
          <div className='mt-2'>
            <Input
              key='team-logo'
              label='Image Link'
              value={assetState.team.logo}
              onChange={(logo) =>
                useAddAssetStore.setState({
                  team: {
                    ...assetState.team,
                    logo,
                  },
                })
              }
            />
          </div>{' '}
          <div className='mt-2'>
            <Input
              key='team-donateLink'
              label='Donate Link'
              value={assetState.team.donateLink}
              onChange={(donateLink) =>
                useAddAssetStore.setState({
                  team: {
                    ...assetState.team,
                    donateLink,
                  },
                })
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TeamSelect
