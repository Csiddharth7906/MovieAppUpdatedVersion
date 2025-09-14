import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data}) => {
  return (
    <div  >
        {data.map((c,i)=><Link key={i}
          
        >{c.name ||c.title || c.original_name || c.original_title}</Link>)}
    </div>
  )
}

export default Cards