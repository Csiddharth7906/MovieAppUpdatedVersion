import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const Moviedetails = () => {
 const {info} = useSelector((state) => state.movie);
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
  return info ?(
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path  })`,
      backgroundPosition:'center top 10%',backgroundSize:"cover",backgroundRepeat: 'no-repeat'
    }} className='w-screen h-screen px-[10%]'>
      {/*part 1*/}
      <nav className='w-full h-[10vh] items-center text-zinc-100 flex gap-10 text-xl' >
        <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] mr-3 ri-arrow-left-line  "></Link>

        <a target='_blank' href={info.detail.homepage}><i className="  hover:text-[#D2042D]   ri-external-link-line"></i></a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className=" hover:text-[#D2042D]  ri-earth-fill"></i></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}    className="  hover:text-[#D2042D]" >imdb</a>
      </nav>
      {/*part 2*/}
      <div className='w-full flex'>
      <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black hover:scale-110 duration-300 rounded-md h-[35vh] object-fit' src={`https://image.tmdb.org/t/p/original/${ info.detail.poster_path  ||info.detail.backdrop_path  }`} alt="" />
      <div>
        { info.watchproviders   && info.watchproviders.flatrate &&  info.watchproviders.flatrate.map((w)=>(
        <img src={`https://image.tmdb.org/t/p/original/${ w.logo_path}`}  />
        ))}
      </div>
      </div>
      

    </div>
  ):<Loading/>
}

export default Moviedetails