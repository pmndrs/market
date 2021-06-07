import classNames from '@/helpers/classNames'
import { RadioGroup } from '@headlessui/react'

const VerticalSelect = ({ options, value, onChange, label }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className='text-sm font-medium text-gray-900'>
        {label}
      </RadioGroup.Label>

      <div className='mt-1 bg-white rounded-md shadow-sm -space-y-px'>
        {options.map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.name}
            value={setting}
            className={({ checked }) =>
              classNames(
                settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                settingIdx === options.length - 1
                  ? 'rounded-bl-md rounded-br-md'
                  : '',
                checked ? 'bg-blue-50 border-blue-200 z-10' : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? 'bg-blue-600 border-transparent'
                      : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-blue-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden='true'
                >
                  <span className='rounded-full bg-white w-1.5 h-1.5' />
                </span>
                <div className='ml-3 flex flex-col'>
                  <RadioGroup.Label
                    as='span'
                    className={classNames(
                      checked ? 'text-blue-900' : 'text-gray-900',
                      'block text-sm font-medium'
                    )}
                  >
                    {setting.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as='span'
                    className={classNames(
                      checked ? 'text-indigo-700' : 'text-gray-500',
                      'block text-sm'
                    )}
                  >
                    {setting.description}
                  </RadioGroup.Description>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default VerticalSelect
