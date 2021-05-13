import { pbrJSON } from './data'
import Table from './Table'

const AddPBR = () => (
  <>
    <p>
      First create a folder with the name of your PBR material, please do not
      leave spaces between the name, so instead of saying{' '}
      <code>worn metal</code> you should do <code>worn-metal</code>
    </p>

    <p className='mt-4'>
      The folder structure will be something like:
      <pre className='p-2 mt-2 bg-gray-100 rounded'>
        <code>
          {`my-material/
├─ info.json
├─ thumbnail.(png|jpg)
├─ material_Color.jpg
├─ material_Displacement.jpg
├─ material_Normal.jpg
├─ ...
`}
        </code>
      </pre>
    </p>
    <p className='mt-4'>
      Here are the fields in the <code>info.json</code>:
    </p>
    <Table data={pbrJSON} />
    <p className='my-4'>The following maps are accepted:</p>
    <ul className='divide-y divide-gray-200'>
      <li className='flex py-4'>
        <p className='text-sm font-medium text-gray-900'>AoMap</p>
      </li>
      <li className='flex py-4'>
        <p className='text-sm font-medium text-gray-900'>map</p>
      </li>
      <li className='flex py-4'>
        <p className='text-sm font-medium text-gray-900'>displacementMap</p>
      </li>
      <li className='flex py-4'>
        <p className='text-sm font-medium text-gray-900'>normalMap</p>
      </li>
      <li className='flex py-4'>
        <p className='text-sm font-medium text-gray-900'>roughnessMap</p>
      </li>
    </ul>
    <p className='mt-4'>
      Not all maps are necessary, if your texture only has a <code>map</code>{' '}
      and <code>normalMap</code> those will be the ones we will render
    </p>
    <p className='mt-6'>
      To create a render a resolution of 420*320px is enough and you can find
      the starter blender file we used in most of our shots{' '}
      <a
        href='https://github.com/pmndrs/market-assets/blob/main/starter.blend'
        target='_blank'
        rel='noreferrer'
      >
        in the repo
      </a>
      , please all feel free to create your own renders.
    </p>
  </>
)

export default AddPBR
