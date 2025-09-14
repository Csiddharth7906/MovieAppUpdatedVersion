import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";
import DropDown from "../templates/DropDown";
import Cards from "../templates/Cards";

const Movie = () => {
        document.title =`MVXC | Popular `
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
    <div>Movie</div>
  )
}

export default Movie