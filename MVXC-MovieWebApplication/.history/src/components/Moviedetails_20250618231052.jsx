import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { asyncloadmovie } from '../store/actions/movieAction';

const Moviedetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(asyncloadmovie())
  },[])
  return (
    <div>Moviedetails</div>
  )
}

export default Moviedetails