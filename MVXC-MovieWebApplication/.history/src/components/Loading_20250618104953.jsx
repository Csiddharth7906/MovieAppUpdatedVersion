import loader  from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center '>
        <img src={loader} alt="" />
    </div>
  )
}

export default Loading