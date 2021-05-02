import copy from 'clipboard-copy'
import useStore from '@/helpers/store'
import parse from '@react-three/gltfjsx'

const licenses = {
  1: {
    link: "https://creativecommons.org/share-your-work/public-domain/cc0/'",
    name: 'CC0',
  },
}

const ModelInfo = (model) => {
  const { parsedBuffer } = useStore((s) => ({ parsedBuffer: s.parsedBuffer }))

  const copyToClipboard = () => {
    const code = parse(`${model.url}.gltf`, parsedBuffer, {
      printwidth: 100,
    })
    copy(code)
  }

  return (
    <div className='mt-5'>
      <div className='block mb-5 overflow-hidden bg-gray-100 rounded group w-80'>
        <img
          src={model.image}
          alt={model.info.name}
          className='object-cover pointer-events-none'
        />
      </div>
      <aside className='relative'>
        <span className='text-gray-600'>Created by: </span>
        <a
          target='_blank'
          href={model.info.creatorLink}
          rel='noreferrer'
          className='font-bold'
        >
          {model.info.creator}
        </a>
        <span className='block'>
          <span className='text-gray-600'>License: </span>{' '}
          {licenses[model.info.license] ? (
            <a
              target='_blank'
              href={licenses[model.info.license].link}
              rel='noreferrer'
              className='font-bold'
            >
              {licenses[model.info.license].name}
            </a>
          ) : (
            <span className='font-bold'>{model.info.license}</span>
          )}
        </span>
        <span className='block'>
          <span className='text-gray-600'>Size: </span>{' '}
          <span className='font-bold'>{model.size}KB</span>
        </span>
        {model.info.categories && (
          <>
            <span className='text-gray-600'>Categories: </span>
            {model.info.categories.map((category) => (
              <span
                key={category}
                className='inline-flex items-center px-2 mt-1 text-xs font-medium text-gray-800 bg-gray-100 rounded py-0.5'
              >
                {category}
              </span>
            ))}
          </>
        )}
        <div className='mt-7'>
          <button
            className='block w-full py-2 text-center text-white bg-gray-800'
            onClick={copyToClipboard}
          >
            Copy JSX Code
          </button>
          {model.gltfTextured && (
            <a
              href={model.gltfTextured}
              download
              className='block w-full py-2 mt-4 text-center text-white bg-indigo-600'
            >
              Download GLTF
            </a>
          )}
          <a
            href={model.gltf}
            download
            className='block w-full py-2 mt-4 text-center text-white bg-indigo-600'
          >
            Download {model.gltfTextured ? 'Untextured' : null} GLTF
          </a>
        </div>
      </aside>
    </div>
  )
}

export default ModelInfo
