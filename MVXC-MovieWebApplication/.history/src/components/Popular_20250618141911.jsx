import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";


const Popular = () => {
  const navigate =  useNavigate()
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetPopular =async()=>{
    try {
      const {data}= await axios.get(`${category}/popular?page=${page}`);
      
      
      if(data.results.length >0){

          setpopular((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(popular.length === 0){
        GetPopular()
    }else{
         setpage(1)
         setpopular([])
         GetPopular();
    }
   }

   useEffect(()=>{
    refresHandler(); 
   },[category,])


  return (
    popular.length > 0 ? (
    <div className='w-screen h-screen  '>
        <div className='w-full px-[5%]  flex items-center justify-between'>
            
            <h1 className=' text-2xl text-zinc-400 font-semibold '> 
                <i onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></i>
                 popular
                 </h1>
                <div className='flex  items-center w-[80%]'>
                <Topnav   />  
              <DropDown title="Category" options={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)} />
              <div className='w-[2%]'></div>
               <DropDown title="Duration" options={["week","day"]} func={(e)=>setduration(e.target.value)} />
                </div>
        </div>

        <InfiniteScroll
                dataLength={popular.length}
                next={GetPopular}
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

export default Popular