import { Slider } from '@reach/slider'
import '@reach/slider/styles.css'

const RangeSlider = ({
  material,
  property,
  value,
  setMaterialsEditor,
  min,
  max,
  step,
}) => {
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
  const props = {
    min: 0,
    max: property === 'emissiveIntensity' ? 10 : 1,
    step: property === 'emissiveIntensity' ? 0.5 : 0.1,
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
        {...props}
        className='w-full'
        type='range'
        id={material}
        name={material}
        defaultValue={value}
        onChange={onRangeChange}
      />
    </div>
  )
}

export default RangeSlider
