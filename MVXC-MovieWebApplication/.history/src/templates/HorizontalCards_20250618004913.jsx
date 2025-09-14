import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'

const HorizontalCards = ({data}) => {
  return (
    <div className='w-full h-[40vh] p-5  '>
        <div className='mb-5 flex justify-between'>
        <h1 className='text-3xl  font-semibold text-zinc-400'>Trending</h1>
        <DropDown title="Filter" option={["tv"]}/>
        </div>

       
        <div className='w-[100%]  flex overflow-y-hidden  '>
            {data.map((d,i)=><div key={i} className='min-w-[15%] h-full mr-5 mb-5'>  
                <img className='w-full hover:shadow-xl hover:shadow-black  object-cover hover:scale-110 duration-300 rounded-md' src={`https://image.tmdb.org/t/p/original/${  d.poster_path||d.backdrop_path  }`} alt="" />
              {/* <h1 className=' text-xl font-black text-white '>{d.name ||d.title || d.original_name || d.original_title}</h1>
              <p className=' mt-3 mb-3 text-white'>{d.overview.slice(0,100)}...<span className='text-blue-400'> more</span></p> */}
                </div>)}
        </div>
    
    
    
    
    
    
    
    
    </div>
  )
}

export default HorizontalCards