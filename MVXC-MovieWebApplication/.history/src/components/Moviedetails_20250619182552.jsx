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
    <div className='w-screen h-screen bg-[#1F1E24] flex items-center justify-center'>


    </div>
  )
}

export default Moviedetails