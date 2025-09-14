import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data,title}) => {
  return (
    <div className='flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] ' >
        {data.map((c,i)=><Link className='w-[25vh] mr-[2%] mb-[2%]' key={i}>
        
        <img className='shadow-[8px_17px_58px_2px_] h-[35vh] object-fit' src={`https://image.tmdb.org/t/p/original/${ c.poster_path  ||c.backdrop_path  }`} alt="" />
       <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
        
        {c.name ||c.title || c.original_name || c.original_title}
       </h1>
        </Link>)}
        
    </div>
  )
}

export default Cards