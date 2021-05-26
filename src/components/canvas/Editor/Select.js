const Select = ({ options, material, property, setMaterialsEditor, value }) => {
  return (
    <div>
      <label
        htmlFor={property}
        className='block mt-2 font-medium text-gray-800 capitalize'
      >
        {property}
      </label>
      <select
        id={property}
        name={property}
        className='block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
        defaultValue={'FrontSide'}
        onChange={(e) => {
          setMaterialsEditor((materials) => ({
            ...materials,
            [material]: {
              ...materials[material],
              [property]: {
                ...materials[material][property],
                value: e.target.value,
              },
            },
          }))
        }}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
