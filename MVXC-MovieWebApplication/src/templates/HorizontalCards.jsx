import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import noimage from "/noimage.jpg";

const HorizontalCards = ({data}) => {
  return (
  
       

        <div className='w-[100%] flex overflow-x-auto overflow-y-hidden mb-6 p-4 lg:p-5 gap-4 lg:gap-5 scrollbar-hide'>
            {data.length >0 ?data.map((d,i)=><Link to={`/${d.media_type}/details/${d.id}`} key={i} className='flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:min-w-[15%] group'>  
                <div className='relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105'>
                  <img className='w-full object-cover aspect-[2/3] group-hover:brightness-110 transition-all duration-300' src={
                     d.poster_path||d.backdrop_path ?
                    `https://image.tmdb.org/t/p/original/${  d.poster_path||d.backdrop_path  }`:noimage} alt="" />
                  
                  {/* Mobile overlay with title */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3'>
                    <div className='text-white'>
                      <h3 className='text-sm font-semibold leading-tight mb-1 line-clamp-2'>{d.name ||d.title || d.original_name || d.original_title}</h3>
                      <div className='flex items-center gap-2 text-xs text-yellow-400'>
                        <i className="ri-star-fill"></i>
                        <span>{d.vote_average?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play button overlay */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='bg-red-600/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300'>
                      <i className="ri-play-fill text-white text-xl"></i>
                    </div>
                  </div>
                </div>
                
                {/* Title below image for mobile */}
                <div className='mt-2 lg:hidden'>
                  <h3 className='text-white text-sm font-medium leading-tight line-clamp-2'>{d.name ||d.title || d.original_name || d.original_title}</h3>
                  <div className='flex items-center gap-1 mt-1 text-xs text-yellow-400'>
                    <i className="ri-star-fill"></i>
                    <span>{d.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
                </Link>):<h1 className='text-xl lg:text-3xl text-white font-black text-center mt-5'>Nothing to show</h1>}
        </div>
    
    
    
    
    
    
    
    
   
  )
}

export default HorizontalCards