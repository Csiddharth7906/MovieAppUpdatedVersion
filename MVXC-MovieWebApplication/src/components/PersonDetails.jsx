import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadperson, removeperson } from '../store/actions/personAction';
import { Link,  useLocation, useNavigate, useParams } from 'react-router-dom';
import HorizontalCards from "../templates/HorizontalCards";
import Loading from './Loading';
import DropDown from '../templates/DropDown';
import noimage from "/noimage.jpg";

const PersonDetails = () => {
   const {pathname} = useLocation();
   const {info} = useSelector((state) => state.person);
    document.title = `MVXC | person Details`;
    const navigate = useNavigate();
  
  const { id } = useParams();
    const dispatch = useDispatch();
    const [category, setcategory] = useState("movie");
    useEffect(() => {
        dispatch(asyncloadperson(id))
        return ()=>{
          // Cleanup if needed
          dispatch(removeperson())
        }
    },[id])
  return info? (
    <div className='w-full max-w-full px-4 lg:px-[10%] min-h-[210vh] bg-[#1F1E24]'>
      {/* part 1 nav navigation*/}
       <nav className='w-full h-[10vh] items-center text-zinc-100 flex gap-4 lg:gap-10 text-lg lg:text-xl' >
              <Link onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line cursor-pointer"></Link>
            </nav>

      <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-0'>
      {/* part 2 img  */}
      <div className='w-full lg:w-[15%] flex flex-col items-center lg:items-start'>
         <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 rounded-md h-[40vh] lg:h-[40vh] w-full lg:w-auto object-cover lg:object-fit mt-3' src={`https://image.tmdb.org/t/p/original/${ info.detail.profile_path }`} alt="" />
           <hr className='mt-6 lg:mt-10 mb-5 text-zinc-500 h-[2px] w-full'/>

           {/* EXTERNAL LINKS */}
           <div className='text-2xl text-white flex gap-x-5 justify-center lg:justify-start w-full'>
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="hover:text-[#D2042D] ri-earth-fill"></i></a>
            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="hover:text-[#D2042D] ri-facebook-circle-fill"></i></a>
            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className="hover:text-[#D2042D] ri-instagram-fill"></i></a>
            <a target='_blank' href={`https://x.com/${info.externalid.twitter_id}`}><i className="hover:text-[#D2042D] ri-twitter-x-fill"></i></a>
           </div>
            {/* Personal information */}
            <div className='w-full text-center lg:text-left'>
            <h1 className='text-xl lg:text-2xl text-zinc-200 font-semibold my-3'>Person Info</h1>
            <h1 className='text-base lg:text-lg text-zinc-400 font-medium'>Known For</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base'>{info.detail.known_for_department}</h1>
              <h1 className='text-base lg:text-lg text-zinc-400 font-medium mt-3'>Gender</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base'>{info.detail.gender===2?"Male":"Female"}</h1>
            <h1 className='text-base lg:text-lg text-zinc-400 font-medium mt-3'>Birthday</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base'>{info.detail.birthday}</h1>
            <h1 className='text-base lg:text-lg text-zinc-400 font-medium mt-3'>Deathday</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base'>{info.detail.deathday ===null?"Alive":info.detail.deathday}</h1>
            <h1 className='text-base lg:text-lg text-zinc-400 font-medium mt-3'>Place of Birth</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base'>{info.detail.place_of_birth}</h1>
            <h1 className='text-base lg:text-lg text-zinc-400 font-medium mt-3'>Also known as</h1>
            <h1 className='text-zinc-400 text-sm lg:text-base leading-relaxed'>{info.detail.also_known_as.join(" , ")}</h1>
            </div>
      </div>
      {/* part 3 details & info */}
      <div className='w-full lg:w-[75%] lg:ml-[5%]'>
       <h1 className='text-3xl lg:text-6xl text-zinc-400 font-black my-3 text-center lg:text-left'>{info.detail.name}</h1>
            <h1 className='text-lg lg:text-xl text-zinc-400 font-medium'>Biography</h1>
            <p className='text-zinc-400 mt-3 text-sm lg:text-base leading-relaxed'>{info.detail.biography}</p>
            <h1 className='text-xl lg:text-2xl text-zinc-200 font-semibold my-3'>Known For</h1>
            <HorizontalCards data={info.combinedCredits.cast} title="Known For" />
            <div className='w-full flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0'>
               <h1 className='text-xl lg:text-2xl text-zinc-200 font-semibold my-3'>Acting</h1>
               <DropDown title="Category" options={["tv","movie"]} func={(e)=>setcategory(e.target.value)} />
            </div>          
           <div className='list-disc text-zinc-400 w-full max-h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-700 mt-5 p-3 lg:p-5'>
                {info[category +"Credits"].cast.map((c,i)=>(
                  <div key={i} className='hover:text-white duration-300 cursor-pointer py-2 lg:py-3'>
                    <Link to={`/${c.media_type || category}/details/${c.id}`} className='flex gap-x-3 lg:gap-x-5 items-center'>
                      <img className='w-[8vh] h-[8vh] lg:w-[10vh] lg:h-[10vh] object-cover rounded-md flex-shrink-0' src={
                        c.poster_path  || c.backdrop_path ?  `https://image.tmdb.org/t/p/original/${c.poster_path  || c.backdrop_path }`:noimage} alt="" />
                      <span className='flex flex-col'>
                      <h1 className='text-sm lg:text-base font-medium'>{c.name || c.title || c.original_name || c.original_title}</h1>
                      <span className='block text-zinc-500 text-xs lg:text-sm'> {c.character && `character name : (${c.character})`}</span>
                      </span>
                    </Link>
                  </div>
                ))}
           </div>
      </div>
      </div>
    </div>
  ):<Loading />
}

export default PersonDetails