import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import HorizontalCards from "../templates/HorizontalCards";
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Moviedetails = () => {
  const {pathname} = useLocation();
 const {info} = useSelector((state) => state.movie);
  document.title = `MVXC | Movie Details`;
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(asyncloadmovie(id))
      return ()=>{
        // Cleanup if needed
        dispatch(removemovie())
      }
  },[id])

  // Check if movie is in user's watchlist/favorites
  useEffect(() => {
    if (isAuthenticated && info) {
      checkWatchlistStatus();
      checkFavoritesStatus();
    }
  }, [isAuthenticated, info]);

  const checkWatchlistStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/watchlist`);
      const isInList = response.data.some(item => item.id === parseInt(id) && item.media_type === 'movie');
      setIsInWatchlist(isInList);
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const checkFavoritesStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/favorites`);
      const isInList = response.data.some(item => item.id === parseInt(id) && item.media_type === 'movie');
      setIsInFavorites(isInList);
    } catch (error) {
      console.error('Error checking favorites status:', error);
    }
  };

  const toggleWatchlist = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      const movieData = {
        id: parseInt(id),
        title: info.detail.title,
        poster_path: info.detail.poster_path,
        release_date: info.detail.release_date,
        vote_average: info.detail.vote_average,
        media_type: 'movie'
      };

      if (isInWatchlist) {
        await axios.delete(`http://localhost:5000/api/auth/watchlist/${id}`);
        setIsInWatchlist(false);
      } else {
        await axios.post(`http://localhost:5000/api/auth/watchlist`, movieData);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorites = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      const movieData = {
        id: parseInt(id),
        title: info.detail.title,
        poster_path: info.detail.poster_path,
        release_date: info.detail.release_date,
        vote_average: info.detail.vote_average,
        media_type: 'movie'
      };

      if (isInFavorites) {
        await axios.delete(`http://localhost:5000/api/auth/favorites/${id}`);
        setIsInFavorites(false);
      } else {
        await axios.post(`http://localhost:5000/api/auth/favorites`, movieData);
        setIsInFavorites(true);
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
    } finally {
      setLoading(false);
    }
  };
  return info ?(
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path  })`,
      backgroundPosition:'center top 10%',backgroundSize:"cover",backgroundRepeat: 'no-repeat'
    }} className='relative overflow-auto w-full max-w-full max-h-[200vh] px-4 lg:px-[10%]'>
      {/*part 1*/}
      <nav className='w-full h-[10vh] items-center text-zinc-100 flex gap-4 lg:gap-10 text-lg lg:text-xl' >
        <Link onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line cursor-pointer"></Link>

        <a target='_blank' href={info.detail.homepage}><i className="hover:text-[#D2042D] ri-external-link-line"></i></a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="hover:text-[#D2042D] ri-earth-fill"></i></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} className="hover:text-[#D2042D]" >imdb</a>
      </nav>
      
      {/*part 2*/}
      <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-0'>
      <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 rounded-md h-[50vh] lg:h-[60vh] w-auto mx-auto lg:mx-0 object-contain mt-3' src={`https://image.tmdb.org/t/p/original/${ info.detail.poster_path  ||info.detail.backdrop_path  }`} alt="" />
       <div className='content lg:ml-[5%] text-white'>
        <h1 className='text-2xl lg:text-4xl font-black'> {info.detail.name ||info.detail.title || info.detail.original_name || info.detail.original_title}
          <small className='text-lg lg:text-2xl font-bold text-zinc-200 block lg:inline'>({info.detail.release_date.split("-")[0]})</small>
        </h1>
        <div className='flex flex-wrap items-center gap-x-2 lg:gap-x-3 gap-y-2 mt-3 mb-5'>
      <span className='text-xs font-semibold w-[5vh] h-[5vh] flex justify-center rounded-full items-center bg-gradient-to-r from-red-900 via-red-700 to-red-400'>{(info.detail.vote_average*10).toFixed()}<sup>%</sup></span>
      <h1 className='font-semibold text-sm lg:text-xl w-auto lg:w-[60px] leading-none'>User Score</h1>
      <h1 className='text-sm lg:text-base'>{info.detail.release_date}</h1>
      <h1 className='text-sm lg:text-base'>({info.detail.genres.map(g=>g.name).join(",")})</h1>
      <h1 className='text-sm lg:text-base'>{info.detail.runtime}min</h1>
        </div>
          <h1 className='text-lg lg:text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
            <h1 className='text-xl lg:text-2xl mt-4 mb-3'>Overview</h1>
            <p className='text-sm lg:text-base leading-relaxed'>{info.detail.overview}</p>

             <h1 className='text-xl lg:text-2xl mt-3 mb-3'>Available in Languages</h1>
            <p className='mb-6 lg:mb-10 leading-6 text-sm lg:text-base'>{info.translations.join(" , ")}</p>
                     
                     <div className='flex flex-col lg:flex-row gap-3 lg:gap-0'>
                       <Link className='rounded-lg p-3 lg:p-5 bg-gradient-to-r from-red-900 via-red-800 to-red-500 text-center' to={`${pathname}/trailer`} ><i className="text-lg lg:text-xl mr-2 lg:mr-3 ri-play-fill"></i> Play Trailer</Link>

                       <Link className='rounded-lg p-3 lg:p-5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-500 lg:ml-5 text-center' to={`/movie/watch/${info.externalid.id}`} ><i className="text-lg lg:text-xl mr-2 lg:mr-3 ri-play-fill"></i> Watch Now</Link>
                     </div>

                     {/* Watchlist and Favorites buttons */}
                     <div className="flex flex-col lg:flex-row gap-3 mt-5">
                       <button
                         onClick={toggleWatchlist}
                         disabled={loading}
                         className={`rounded-lg p-3 transition duration-200 flex items-center justify-center ${
                           isInWatchlist 
                             ? 'bg-green-600 hover:bg-green-700 text-white' 
                             : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                         }`}
                       >
                         <i className={`text-xl mr-2 ${isInWatchlist ? 'ri-bookmark-fill' : 'ri-bookmark-line'}`}></i>
                         {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                       </button>

                       <button
                         onClick={toggleFavorites}
                         disabled={loading}
                         className={`rounded-lg p-3 transition duration-200 flex items-center justify-center ${
                           isInFavorites 
                             ? 'bg-red-600 hover:bg-red-700 text-white' 
                             : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                         }`}
                       >
                         <i className={`text-xl mr-2 ${isInFavorites ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                         {isInFavorites ? 'Favorited' : 'Add to Favorites'}
                       </button>
                     </div>

       </div>
      </div>
       
      {/*part 3*/}
       <div className='w-full lg:w-[80%] flex flex-col gap-y-5 mt-6 lg:mt-10'>

                 { info.watchproviders && info.watchproviders.flatrate && 
              <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-center text-white'>
                <h1 className='text-lg lg:text-base font-semibold lg:font-normal'>
                  Available on Platforms
                </h1>
                <div className='flex gap-3 lg:gap-4 flex-wrap'>
               { info.watchproviders.flatrate.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[6vh] lg:w-[5vh] object-fit h-[6vh] lg:h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
                </div>
              </div>
              }
      
              { info.watchproviders && info.watchproviders.rent && 
              <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-center text-white'>
                <h1 className='text-lg lg:text-base font-semibold lg:font-normal'>
                  Available on Rent
                </h1>
                <div className='flex gap-3 lg:gap-4 flex-wrap'>
               { info.watchproviders.rent.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[6vh] lg:w-[5vh] object-fit h-[6vh] lg:h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
                </div>
              </div>
              }


              { info.watchproviders && info.watchproviders.buy && 
              <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-center text-white'>
                <h1 className='text-lg lg:text-base font-semibold lg:font-normal'>
                  Available on Buy
                </h1>
                <div className='flex gap-3 lg:gap-4 flex-wrap'>
               { info.watchproviders.buy.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[6vh] lg:w-[5vh] object-fit h-[6vh] lg:h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
                </div>
              </div>
              }
          
        </div>   
      {/*part 4*/}
      <hr className='mt-10 mb-5 text-zinc-500 h-[2px]'/>
      <h1 className='text-2xl lg:text-3xl font-bold text-white'>Recommendations & Similar Movies</h1>
      <HorizontalCards  data={info.recommendations.length>0 ? info.recommendations : info.similar} />
     
            <Outlet />
    </div>
  ):<Loading/>
}

export default Moviedetails
