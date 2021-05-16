function CreatorInfo(props) {
  return (
    <a target='_blank' href={props.link} rel='noreferrer' className='font-bold'>
      {props.name}
    </a>
  )
}

export default CreatorInfo
