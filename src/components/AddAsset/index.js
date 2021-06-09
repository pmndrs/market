import useAddAssetStore from '@/helpers/store/addAsset'
import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const AddAsset = () => {
  const [step, setStep] = useState(1)
  const { createAsset } = useAddAssetStore()

  const submit = () => {
    createAsset()
    setStep(3)
  }

  if (step === 1) {
    return <Step1 onClick={() => setStep(2)} />
  }
  if (step === 2) {
    return <Step2 onClick={submit} />
  }

  return <Step3 />
}

export default AddAsset
