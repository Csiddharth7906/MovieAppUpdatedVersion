import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data}) => {
  return (
    <div  >
        {data.map((c,i)=><Link key={i}
          {.name ||.title || .original_name || .original_title}
        ></Link>)}
    </div>
  )
}

export default Cards