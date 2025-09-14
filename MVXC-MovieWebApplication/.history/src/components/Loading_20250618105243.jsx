import loader  from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black '>
        <img  className='w-[]' src={loader} alt="" />
    </div>
  )
}

export default Loading