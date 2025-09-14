import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg";

const Cards = ({data,title}) => {

  
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap w-full max-w-full h-full py-4 lg:py-[1%] px-3 lg:px-6 bg-[#1F1E24] gap-3 lg:gap-0' >
        {data.map((c,i)=><Link to={`/${c.media_type || title}/details/${c.id}`}  className='relative w-full lg:w-[25vh] lg:mr-[2%] lg:mb-[2%] group' key={i}>
        
        <img className='w-full shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black hover:scale-110 duration-300 rounded-md h-[200px] sm:h-[240px] md:h-[280px] lg:h-[35vh] object-cover' src={
          c.poster_path  ||c.backdrop_path ||c.profile_path ?
          `https://image.tmdb.org/t/p/original/${ c.poster_path  ||c.backdrop_path ||c.profile_path }`:noimage} alt="" />
       <h1 className='text-sm sm:text-base lg:text-2xl text-zinc-300 mt-2 lg:mt-3 font-semibold leading-tight line-clamp-2'>
        
        {c.name ||c.title || c.original_name || c.original_title}
       </h1>
      { c.vote_average &&(

       <div className='text-white right-[-2%] lg:right-[-4%] bottom-[35%] lg:bottom-[40%] absolute text-xs font-semibold w-8 h-8 lg:w-[5vh] lg:h-[5vh] flex justify-center rounded-full items-center bg-gradient-to-r from-red-900 via-red-700 to-red-400'>{(c.vote_average*10).toFixed()}<sup className='text-[8px] lg:text-xs'>%</sup></div>
      )}
        </Link>)}
        
    </div>
  )
}

export default Cards