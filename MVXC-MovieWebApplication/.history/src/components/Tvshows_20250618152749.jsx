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
  const [category, setcategory] = useState("now_playing");
  const [tvshow, settvshow] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const Gettvshow =async()=>{
    try {
      const {data}= await axios.get(`/tvshow/${category}?page=${page}`);
      
      
      if(data.results.length >0){

          settvshow((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(tvshow.length === 0){
        Gettvshow()
    }else{
         setpage(1)
         settvshow([])
         Gettvshow();
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