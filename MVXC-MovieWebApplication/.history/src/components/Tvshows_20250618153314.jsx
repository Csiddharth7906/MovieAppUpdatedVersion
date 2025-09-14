import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";
import DropDown from "../templates/DropDown";
import Cards from "../templates/Cards";

const Tvshows = () => {
    document.title =`MVXC | Tv Shows `
  const navigate =  useNavigate()
  const [category, setcategory] = useState("airing-today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetTv =async()=>{
    try {
      const {data}= await axios.get(`/tv/${category}?page=${page}`);
      
      
      if(data.results.length >0){

          settv((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(tv.length === 0){
        GetTv()
    }else{
         setpage(1)
         settv([])
         GetTv();
    }
   }

   useEffect(()=>{
    refresHandler(); 
   },[category,])

  return (
    <div>Tvshows</div>
  )
}

export default Tvshows