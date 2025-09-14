import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadtv, removetv } from '../store/actions/tvAction';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import HorizontalCards from "../templates/HorizontalCards";
import Loading from './Loading';
import noimage from "/noimage.jpg";

const Tvdetails = () => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
    const {pathname} = useLocation();
   const {info} = useSelector((state) => state.tv);
    document.title = `MVXC | tv Details`;
    const navigate = useNavigate();
  
  const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncloadtv(id))
        return ()=>{
          // Cleanup if needed
          dispatch(removetv())
        }
    },[id])
  useEffect(() => {
  if (info && info.detail && info.detail.seasons.length > 0) {
    const selectedSeason = info.detail.seasons.find(s => s.season_number === Number(season));
    if (selectedSeason) {
      setEpisode(1); // Reset episode to 1 when season changes
    }
  }
}, [season, info]);

  
  
 return info ?(
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(189, 181, 181, 0.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path  })`,
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
          <small className='text-lg lg:text-2xl font-bold text-zinc-200 block lg:inline'>({info.detail.first_air_date.split("-")[0]})</small>
        </h1>
        <div className='flex flex-wrap items-center gap-x-2 lg:gap-x-3 gap-y-2 mt-3 mb-5'>
      <span className='text-xs font-semibold w-[5vh] h-[5vh] flex justify-center rounded-full items-center bg-gradient-to-r from-red-900 via-red-700 to-red-400'>{(info.detail.vote_average*10).toFixed()}<sup>%</sup></span>
      <h1 className='font-semibold text-sm lg:text-xl w-auto lg:w-[60px] leading-none'>User Score</h1>
      <h1 className='text-sm lg:text-base'>{info.detail.first_air_date}</h1>
      <h1 className='text-sm lg:text-base'>({info.detail.genres.map(g=>g.name).join(",")})</h1>
      <h1 className='text-sm lg:text-base'>{info.detail.runtime}min</h1>
        </div>
          <h1 className='text-lg lg:text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
            <h1 className='text-xl lg:text-2xl mt-4 mb-3'>Overview</h1>
            <p className='text-sm lg:text-base leading-relaxed'>{info.detail.overview}</p>

             <h1 className='text-xl lg:text-2xl mt-3 mb-3'>Available in Languages</h1>
            <p className='mb-6 lg:mb-10 leading-6 text-sm lg:text-base'>{info.translations.join(" , ")}</p>
                     
                     <div className='flex flex-col lg:flex-row gap-3 lg:gap-0'>
                       <Link className='rounded-lg p-3 lg:p-5 bg-[#D2042D] text-center' to={`${pathname}/trailer`} ><i className="text-lg lg:text-xl mr-2 lg:mr-3 ri-play-fill"></i> Play Trailer</Link>
                       <Link className='rounded-lg p-3 lg:p-5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-500 lg:ml-5 text-center' to={`/tv/watch/${info.externalid.id}?type=tv&season=${season}&episode=${episode}`} ><i className="text-lg lg:text-xl mr-2 lg:mr-3 ri-play-fill"></i> Watch Now</Link>
                     </div>

  <div className="text-white my-6 flex flex-col lg:flex-row gap-4 lg:gap-5 lg:items-center">
  <div className='w-full lg:w-auto'>
    <label className="block mb-1 font-semibold text-sm lg:text-base">Season:</label>
    <select
      className="bg-gray-800 text-white px-3 py-2 rounded w-full lg:w-auto"
      value={season}
      onChange={(e) => setSeason(e.target.value)}
    >
      {info.detail.seasons.map((s, i) => (
        <option key={i} value={s.season_number || i}>
          {s.name || `Season ${s.season_number || i}`}
        </option>
      ))}
    </select>
  </div>

  <div className='w-full lg:w-auto'>
    <label className="block mb-1 font-semibold text-sm lg:text-base">Episode:</label>
    <select
      className="bg-gray-800 text-white px-3 py-2 rounded w-full lg:w-auto"
      value={episode}
      onChange={(e) => setEpisode(e.target.value)}
    >
      {Array.from({
        length: info.detail.seasons.find(s => (s.season_number || s.id || i) == season)?.episode_count || 12
      }, (_, i) => (
        <option key={i} value={i + 1}>Episode {i + 1}</option>
      ))}
    </select>
  </div>
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
      <h1 className='text-2xl lg:text-3xl font-bold text-white'>Seasons</h1>
      <div className='w-full flex overflow-x-auto lg:overflow-y-hidden p-3 lg:p-5 gap-3 lg:gap-5'>
        {info.detail.seasons.length>0?info.detail.seasons.map((s,i)=>(
       <div className='min-w-[120px] lg:min-w-[15%] h-full flex flex-col items-center flex-shrink-0' key={i}>
            <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 rounded-md h-[25vh] lg:h-[35vh] w-full object-cover' src={ s.poster_path ? `https://image.tmdb.org/t/p/original/${ s.poster_path }`:noimage} alt="" />   
            <h1 className='text-sm lg:text-xl text-zinc-300 mt-2 lg:mt-3 font-semibold text-center'>
                              {s.name}  
           </h1>
   </div>
        )):<h1 className='text-2xl lg:text-3xl text-white font-black text-center mt-5'>Nothing to show</h1>}
      </div>
       
      {/*part 5*/}
      <hr className='mt-10 mb-5 text-zinc-500 h-[2px]'/>
      <h1 className='text-2xl lg:text-3xl font-bold text-white'>Recommendations & Similar Shows</h1>
      <HorizontalCards  data={info.recommendations.length>0 ? info.recommendations : info.similar} />
     
            <Outlet />
    </div>
  ):<Loading/>
}

export default Tvdetails
