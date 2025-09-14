import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCards = ({data}) => {
  return (
    <div className='w-full h-[40vh] p-5 '>
        <div className='mb-5'>
        <h1 className='text-3xl  font-semibold text-zinc-400'>Trending</h1>
        </div>

       
        <div className='w-[100%] flex overflow-x-auto'>
            {data.map((d,i)=><div key={i} className='min-w-[15%] mr-5 bg-red-100'>  
                <img className='w-full h-[40%] object-cover' src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path }`} alt="" />
              <h1 className='w-[70%] text-xl font-black text-white '>{d.name ||d.title || d.original_name || d.original_title}</h1>
              <p className='w-[70%] mt-3 mb-3 text-white'>{d.overview.slice(0,100)}...<span className='text-blue-400'> more</span></p>
                </div>)}
        </div>
    
    
    
    
    
    
    
    
    </div>
  )
}

export default HorizontalCards