import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data,title}) => {
  return (
    <div  >
        {data.map((c,i)=><Link className='w-[25vh]' key={i}>
        
        <img className='w-[25vh] ' src="" alt="" />
        {c.name ||c.title || c.original_name || c.original_title}</Link>)}
    </div>
  )
}

export default Cards