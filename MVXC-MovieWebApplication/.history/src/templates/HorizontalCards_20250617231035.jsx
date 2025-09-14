import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCards = ({data}) => {
  return (
    <div className='w-full h-[40vh] p-5 '>
        <div className='mb-5'>
        <h1 className='text-3xl  font-semibold text-zinc-400'>Trending</h1>
        </div>

       
        <div className='w-[100%] flex overflow-x-auto'>
            {data.map((d,i)=><div key={i} className='w-[15%] mr-5 bg-red-100'>  
              <h1 className='w-[70%] text-5xl font-black text-white '>{data.name ||data.title || data.original_name || data.original_title}</h1>
              <p className='w-[70%] mt-3 mb-3 text-white'>{data.overview.slice(0,200)}...<Link className='text-blue-400'> more</Link></p>
                </div>)}
        </div>
    
    
    
    
    
    
    
    
    </div>
  )
}

export default HorizontalCards