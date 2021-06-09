import { ChromePicker } from 'react-color'

const ColorPicker = ({ property, value, material, setMaterialsEditor }) => {
  const onChange = (val) => {
    if (val.hex) {
      setMaterialsEditor((m) => ({
        ...m,
        [material]: {
          ...m[material],
          [property]: {
            ...m[material][property],
            value: val.hex,
          },
        },
      }))
    }
  }
  return (
    <>
      <span className='block mb-2 font-medium text-gray-800 capitalize'>
        {property}
      </span>
      <ChromePicker
        key={property}
        disableAlpha={true}
        color={value}
        onChange={onChange}
      />
    </>
  )
}

export default ColorPicker
