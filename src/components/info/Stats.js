const Stats = ({ stats, size }) => {
  if (Object.keys(stats).length === 0) return null
  const items = [
    { name: 'Model Size', stat: size },
    { name: 'Meshes', stat: stats.meshes.properties.length },
    {
      name: 'Faces',
      stat: stats.faces,
    },
    {
      name: 'Vertices',
      stat: stats.vertices,
    },

    { name: 'Textures', stat: stats.textures.properties.length },
    stats.textures.properties.length
      ? {
          name: 'Texture Size',
          stat: stats.textures.properties[0].resolution,
        }
      : null,
    { name: 'Animations', stat: stats.animations.properties.length },
    { name: 'Skinned', stat: stats.skinned },
    stats.extensions
      ? {
          name: 'Extensions Required',
          stat: stats.extensions.join(', '),
          small: true,
        }
      : null,
    { name: 'Memory Consumption', stat: `~${stats.memoryConsumption}` },
  ].filter((e) => e)

  return (
    <div>
      <h3 className='text-lg font-medium text-gray-900 leading-6'>
        Model Stats
      </h3>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5'>
        {items.map((item) => (
          <div
            key={item.name}
            className='px-4 py-5 overflow-hidden bg-transparent rounded-lg shadow dark:border dark:border-gray-800 sm:p-6'
          >
            <dt className='text-sm font-medium text-gray-500 truncate'>
              {item.name}
            </dt>
            <dd
              className={`${
                item.small ? `text-xs` : `text-3xl`
              } mt-1  font-semibold text-gray-900`}
            >
              {typeof item.stat === 'boolean' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-10 w-10 ${
                    item.stat ? 'text-green-600' : 'text-red-600'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  {item.stat ? (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  ) : (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  )}
                </svg>
              ) : (
                item.stat
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
export default Stats
