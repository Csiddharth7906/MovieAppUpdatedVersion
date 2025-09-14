import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'

const HorizontalCards = ({data}) => {
  return (
  
       
       
        <div className='w-[100%]  flex overflow-y-hidden mb-5 p-5'>
            {data.map((d,i)=><div key={i} className='min-w-[15%] h-full mr-5 mb-5'>  
                <img className='w-full hover:shadow-xl hover:shadow-black  object-cover hover:scale-110  duration-300 rounded-md' src={`https://image.tmdb.org/t/p/original/${  d.poster_path||d.backdrop_path  }`} alt="" />
              {/* <h1 className=' text-xl font-black text-white '>{d.name ||d.title || d.original_name || d.original_title}</h1>
              <p className=' mt-3 mb-3 text-white'>{d.overview.slice(0,100)}...<span className='text-blue-400'> more</span></p> */}
                </div>)}
        </div>
    
    
    
    
    
    
    
    
   
  )
}

export default HorizontalCards