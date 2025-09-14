import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { useParams } from 'react-router-dom';

const Moviedetails = () => {
const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(asyncloadmovie(id))
      return ()=>{
        // Cleanup if needed
        dispatch(removemovie())
      }
  },[])
  return (
    <div className='w-screen h-screen px'>


    </div>
  )
}

export default Moviedetails