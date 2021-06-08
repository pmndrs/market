import { supabase } from '@/helpers/initSupabase'
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
  }, [assetState.team.name])

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>Team</label>

      <div className='flex items-center mt-2'>
        <input
          onChange={(e) =>
            useAddAssetStore.setState({ partOfTeam: e.target.checked })
          }
          checked={assetState.partOfTeam}
          id='team'
          name='team'
          type='checkbox'
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label htmlFor='team' className='ml-2 block text-sm text-gray-900'>
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
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option>Please select a team</option>
              {teams.map((team) => (
                <option value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className='mt-4'>
            <span className='block text-sm font-medium text-gray-700 mb-2'>
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
              key='team-imageLink'
              label='Image Link'
              value={assetState.team.imageLink}
              onChange={(imageLink) =>
                useAddAssetStore.setState({
                  team: {
                    ...assetState.team,
                    imageLink,
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
