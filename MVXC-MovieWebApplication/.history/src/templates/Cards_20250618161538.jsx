import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data,title}) => {
  return (
    <div className='flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] ' >
        {data.map((c,i)=><Link className=' relative w-[25vh] mr-[2%] mb-[2%]' key={i}>
        
        <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black hover:scale-110 duration-300 rounded-md h-[35vh] object-fit' src={`https://image.tmdb.org/t/p/original/${ c.poster_path  ||c.backdrop_path ||c.profile_path }`} alt="" />
       <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
        
        {c.name ||c.title || c.original_name || c.original_title}
       </h1>
       <div className='text-white right-[-15] bottom-[30%] absolute text-xl font-semibold w-[5vh] h-[5vh] flex justify-center rounded-full items-center bg-yellow-600'>{(c.vote_average*10).toFixed()}<sup>%  </sup></div>
        </Link>)}
        
    </div>
  )
}

export default Cards