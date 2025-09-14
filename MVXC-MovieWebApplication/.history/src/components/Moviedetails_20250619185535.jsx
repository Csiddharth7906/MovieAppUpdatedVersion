import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Moviedetails = () => {
  
  document.title = `MVXC | Movie Details`;
  const navigate = useNavigate();

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
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path })`,
      backgroundPosition:'center top 10%',backgroundSize:"cover",backgroundRepeat: 'no-repeat'
    }} className='w-screen h-screen px-[10%]'>
      <nav className='w-full text-zinc-400' >
        <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-3 ri-arrow-left-line  "></Link>

        <a href=""><i class="ri-external-link-line"></i></a>
        <a href=""><i class="ri-earth-fill"></i></a>
        <a href="">imdb</a>
      </nav>

    </div>
  )
}

export default Moviedetails