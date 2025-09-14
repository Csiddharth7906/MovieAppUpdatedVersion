import React, { useEffect, useState } from 'react'
import Topnav from '../templates/Topnav'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../templates/DropDown'
import axios from '../utils/axios'

const Trending = () => {
  const navigate =  useNavigate()
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState(null);


    const GetTrending =async()=>{
    try {
      const {data}= await axios.get(`/trending/${category}/${duration}`);
      settrending(data.results)
      setduration(data.results)
    } catch (error) {
      console.log("Errror :",error)
    }
   };
 console.log(trending)
   useEffect(()=>{
    GetTrending();
   },[category,duration])




  return (
    <div className='w-screen h-screen px-[3%]'>
        <div className='w-full    flex items-center justify-between'>
            
            <h1 className=' text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
                 Trending
                 </h1>
                <div className='flex  items-center w-[80%]'>
                <Topnav   />  
              <DropDown title="Category" options={["movie","tv","all"]} func="" />
              <div className='w-[2%]'></div>
               <DropDown title="Duration" options={["week","day"]} func="" />
                </div>
        </div>



        








    </div>
  )
}

export default Trending