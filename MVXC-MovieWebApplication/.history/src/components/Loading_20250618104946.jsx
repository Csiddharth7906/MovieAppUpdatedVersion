import loader  from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-full justify-center flex'>
        <img src={loader} alt="" />
    </div>
  )
}

export default Loading