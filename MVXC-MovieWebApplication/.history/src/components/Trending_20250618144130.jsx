import React, { useEffect, useState } from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../templates/DropDown'
import axios from '../utils/axios'
import Cards from '../templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
   
  const navigate =  useNavigate()
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)


    const GetTrending =async()=>{
    try {
      const {data}= await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length >0){

          settrending((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(trending.length === 0){
        GetTrending()
    }else{
         setpage(1)
         settrending([])
         GetTrending();
    }
   }

   useEffect(()=>{
    refresHandler(); 
    
   },[category,duration])




  return trending.length > 0 ? (
    <div className='w-screen h-screen  '>
        <div className='w-full px-[5%]  flex items-center justify-between'>
            
            <h1 className=' text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
                 Trending
                 </h1>
                <div className='flex  items-center w-[80%]'>
                <Topnav   />  
              <DropDown title="Category" options={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)} />
              <div className='w-[2%]'></div>
               <DropDown title="Duration" options={["week","day"]} func={(e)=>setduration(e.target.value)} />
                </div>
        </div>

        <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasmore}
               loader={
                    <div className="flex justify-center bg-[#1F1E24] items-center py-10">
                        <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-[#D2042D] border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-[#D2042D] border-b-transparent rounded-full animate-spin-reverse"></div>
                        </div>
                    </div>
                    }
        >
            <Cards data={trending} title={category}/>

        </InfiniteScroll>


    </div>
  ): <Loading />
}

export default Trending