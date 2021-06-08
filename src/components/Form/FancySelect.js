import useAddAssetStore from '@/helpers/store/addAsset'
import { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Select } from 'antd'
import { PlusIcon } from '@heroicons/react/solid'
import Input from './Input'
import { supabase } from '@/helpers/initSupabase'

const { Option } = Select

const FancySelect = () => {
  const assetState = useAddAssetStore()
  const [newCat, setNewCat] = useState('')

  const getCategories = async () => {
    const allCats = await supabase
      .from(assetState.selectedType.url || assetState.assetTypes[0].url)
      .select('category')
    const cats = Array.from(new Set(allCats.data.map((a) => a.category)))
    useAddAssetStore.setState({ availableCats: cats })
  }

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetState.selectedType])

  return (
    <div>
      <label
        htmlFor='location'
        className='block text-sm font-medium text-gray-700'
      >
        Category
      </label>
      <Select
        onChange={(category) => useAddAssetStore.setState({ category })}
        dropdownRender={(menu) => (
          <div>
            {menu}

            <div className='flex items-center px-2 text-base text-gray-800 border-t border-gray-200'>
              <div className='flex-grow mr-2'>
                <Input value={newCat} onChange={(value) => setNewCat(value)} />
              </div>
              <button
                className='flex text-sm'
                onClick={() =>
                  useAddAssetStore.setState({
                    newCat: '',
                    availableCats: [...assetState.availableCats, newCat],
                  })
                }
              >
                <PlusIcon className='w-5 h-5 mr-2' /> Add Category
              </button>
            </div>
          </div>
        )}
      >
        {assetState.availableCats.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    </div>
  )
}

export default FancySelect
