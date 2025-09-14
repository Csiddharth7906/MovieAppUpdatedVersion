import Notfound  from '/404.gif'

const NotFound = () => {
  return (
    <div className='w-screen  absolute top-0 left-0 h-screen flex justify-center items-center bg-black '>
            <img  className='h-[50%]  object-cover' src={Notfound} alt="" />
        </div>
  )
}

export default NotFound