import React from 'react'

const Header = ({data}) => {
  return (
    <div style={{
       minHeight: '300px', // not fixed, just ensures minimum space
  background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
    }} className='w-full h-[50vh] '>

    </div>
  )
}

export default Header