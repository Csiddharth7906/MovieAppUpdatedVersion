import React from 'react'

const Cards = ({data}) => {
  return (
    <div  >
        {data.map((c))}
    </div>
  )
}

export default Cards