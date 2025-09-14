import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data}) => {
  return (
    <div  >
        {data.map((c,i)=><Link key={i}
          {data.name ||data.title || data.original_name || data.original_title}
        ></Link>)}
    </div>
  )
}

export default Cards