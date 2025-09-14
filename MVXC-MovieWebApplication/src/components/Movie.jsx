import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";
import DropDown from "../templates/DropDown";
import Cards from "../templates/Cards";

const Movie = () => {
        document.title =`MVXC | Movies `
  const navigate =  useNavigate()
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetMovie =async()=>{
    try {
      const {data}= await axios.get(`/movie/${category}?page=${page}`);
      
      
      if(data.results.length >0){

          setmovie((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(movie.length === 0){
        GetMovie()
    }else{
         setpage(1)
         setmovie([])
         GetMovie();
    }
   }

   useEffect(()=>{
    refresHandler(); 
   },[category,])

  return (
  movie.length > 0 ? (
    <div className='w-full max-w-full h-screen overflow-x-hidden'>
        <div className='w-full px-4 lg:px-[5%] py-4 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0'>
            
            <h1 className='text-xl lg:text-2xl text-zinc-400 font-semibold flex items-center'> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line cursor-pointer"></i>
               Movie <small className="text-sm text-zinc-600">({category})</small>
                 </h1>
                
                {/* Mobile Layout */}
                <div className='w-full lg:hidden flex flex-col gap-3'>
                    <Topnav />
                    <DropDown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)} />
                </div>
                
                {/* Desktop Layout */}
                <div className='hidden lg:flex items-center w-[80%]'>
                    <Topnav />  
                    <DropDown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)} />
                    <div className='w-[2%]'></div>
                </div>
        </div>

        <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
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
            <Cards data={movie} title="movie"/>

        </InfiniteScroll>


    </div>
  ): <Loading />
  
)
}

export default Movie