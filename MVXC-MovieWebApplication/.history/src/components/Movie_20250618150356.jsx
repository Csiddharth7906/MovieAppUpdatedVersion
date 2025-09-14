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
        GetmovMe()
    }else{
         setpage(1)
         setmovie([])
         Metmovie();
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