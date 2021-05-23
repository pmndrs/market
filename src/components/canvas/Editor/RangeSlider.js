import { Slider } from '@reach/slider'
import '@reach/slider/styles.css'

const RangeSlider = ({ material, property, value, setMaterialsEditor }) => {
  const onRangeChange = (val) => {
    setMaterialsEditor((materials) => {
      return {
        ...materials,
        [material]: {
          ...materials[material],
          [property]: {
            type: 'range',
            value: parseFloat(val),
          },
        },
      }
    })
  }
  return (
    <div className='mt-2'>
      <label
        className='block font-medium text-gray-800 capitalize'
        htmlFor={material}
      >
        {property}
      </label>
      <Slider
        min={0}
        step={0.01}
        max={1}
        className='w-full'
        type='range'
        id={material}
        name={material}
        defaultValue={value.toString()}
        onChange={onRangeChange}
      />
    </div>
  )
}

export default RangeSlider
