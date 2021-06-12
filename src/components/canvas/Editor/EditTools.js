import Button from '@/components/Button'
import classNames from '@/helpers/classNames'
import { useState } from 'react'

import { saveAs } from 'file-saver'
import { GLTFExporter } from 'three-stdlib'
import RangeSlider from './RangeSlider'
import ColorPicker from './ColorPicker'
import { useUpdateScene } from './useUpdateScene'
import Select from './Select'

const EditTools = ({ materialsEditor, scene, setMaterialsEditor }) => {
  const [activeTab, setActiveTab] = useState()
  const exporter = new GLTFExporter()
  useUpdateScene({ materialsEditor, scene })

  const save = () => {
    exporter.parse(scene, function (gltf) {
      var blob = new Blob([JSON.stringify(gltf)], {
        type: 'application/gltf; charset=us-ascii',
      })
      saveAs(blob, 'model.gltf')
    })
  }

  return (
    <main className='p-4'>
      <button
        onClick={(e) => {
          e.preventDefault()
          window.history.go(-1)
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-10 h-10'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M11 17l-5-5m0 0l5-5m-5 5h12'
          />
        </svg>
      </button>
      <div className='flex mt-10 background-white'>
        <nav className='mr-5 space-y-1'>
          <h2 className='px-3 py-2 text-base font-bold'>Materials</h2>
          {Object.keys(materialsEditor).map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item)}
              className={classNames(
                activeTab === item
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'flex items-center px-3 py-2 text-sm font-medium rounded-md'
              )}
            >
              <span className='capitalize truncate'>{item}</span>
            </button>
          ))}
        </nav>
        <section>
          {activeTab && <h2 className='py-2 text-base font-bold'>Edit</h2>}
          {Object.keys(materialsEditor).map((material) => (
            <div
              key={material}
              className={`${activeTab === material ? '' : 'hidden'}`}
            >
              {Object.keys(materialsEditor[material]).map((property, i) => {
                const val = materialsEditor[material][property]
                const props = {
                  material,
                  property,
                  setMaterialsEditor,
                  value: val.value,
                  key: i,
                }

                if (val.type === 'range') {
                  return (
                    <RangeSlider
                      {...props}
                      max={val.max}
                      min={val.min}
                      step={val.step}
                    />
                  )
                }
                if (val.type === 'color') {
                  return <ColorPicker {...props} />
                }

                if (val.type === 'select') {
                  return <Select {...props} options={val.options} />
                }

                return null
              })}
            </div>
          ))}
        </section>
      </div>
      <Button className='fixed bottom-5 right-5' onClick={save}>
        Download Model
      </Button>
    </main>
  )
}

export default EditTools
