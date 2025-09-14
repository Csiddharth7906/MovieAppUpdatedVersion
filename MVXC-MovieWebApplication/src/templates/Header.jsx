import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  return (
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path })`,
      backgroundPosition:'center top 10%',backgroundSize:"cover",backgroundRepeat: 'no-repeat'
    }} className='w-full h-[45vh] lg:h-[50vh] flex flex-col justify-end items-start p-4 lg:p-[5%] relative'>
      {/* Mobile gradient overlay for better text readability */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden'></div>
      
      <div className='relative z-10 w-full'>
        <h1 className='w-full lg:w-[70%] text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight mb-3 lg:mb-0 drop-shadow-lg'>{data.name ||data.title || data.original_name || data.original_title}</h1>
        <p className='w-full lg:w-[70%] mt-2 lg:mt-3 mb-3 lg:mb-3 text-white/90 text-sm lg:text-base leading-relaxed drop-shadow-md'>{data.overview.slice(0,120)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400 font-medium hover:text-blue-300 transition-colors'> more</Link></p>
        
        {/* Info badges */}
        <div className='flex flex-wrap gap-3 mb-4 lg:mb-3'>
          <span className='bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs lg:text-sm flex items-center'>
            <i className="text-yellow-400 ri-calendar-line mr-1"></i>
            {data.release_date || "No Information"}
          </span>
          <span className='bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs lg:text-sm flex items-center'>
            <i className="text-yellow-400 ri-movie-2-line mr-1"></i>
            {data.media_type.toUpperCase()}
          </span>
        </div>
        
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-white text-sm lg:text-base font-medium mt-2 lg:mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'>
          <i className="ri-play-fill mr-2"></i>
          Watch Trailer
        </Link>
      </div>
    </div>
  )
}

export default Header