import React from 'react'
import Topnav from '../templates/Topnav'
import { Link } from 'react-router-dom'

const Trending = () => {
  return (
    <div className='w-screen h-screen p-[3%]'>
        <div className='w-full   flex items-center'>
            <Link
            <h1 className='text-2xl text-zinc-400 font-semibold'>Trending</h1>
        </div>
    </div>
  )
}

export default Trending