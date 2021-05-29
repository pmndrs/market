import SubmitButton from './submitButton'
import Textarea from './Textarea'

const EditCommentForm = ({ onSubmit, onChange, value, onCancel }) => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <Textarea onChange={onChange} value={value} />
      <div className='mt-2'>
        <SubmitButton>Update Comment</SubmitButton>

        <button className='ml-4 font-medium' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditCommentForm
