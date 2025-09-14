import React from 'react'

const Header = ({data}) => {
  return (
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path })`,
      backgroundPosition:'center',backgroundSize:"cover"
    }} className='w-full h-[50vh]  '>
      <h1>{data.name ||data.title || data.original_name || data.original_title}</h1>
    </div>
  )
}

export default Header