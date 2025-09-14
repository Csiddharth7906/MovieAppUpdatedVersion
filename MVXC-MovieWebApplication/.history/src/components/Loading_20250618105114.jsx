import loader  from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-full flex justify-center items-center '>
        <img src={loader} alt="" />
    </div>
  )
}

export default Loading