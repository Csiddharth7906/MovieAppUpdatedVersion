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
  const [category, setcategory] = useState("movie");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetMovie =async()=>{
    try {
      const {data}= await axios.get(`${category}/movie?page=${page}`);
      
      
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
    <div className='w-screen h-screen  '>
        <div className='w-full px-[5%]  flex items-center justify-between'>
            
            <h1 className=' text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
               Movie
                 </h1>
                <div className='flex  items-center w-[80%]'>
                <Topnav   />  
              <DropDown title="Category" options={["tv","movie"]} func={(e)=>setcategory(e.target.value)} />
              <div className='w-[2%]'></div>
              
                </div>
        </div>

        <InfiniteScroll
                dataLength={popular.length}
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
            <Cards data={popular} title={category}/>

        </InfiniteScroll>


    </div>
  ): <Loading />
  )
  
}

export default Movie