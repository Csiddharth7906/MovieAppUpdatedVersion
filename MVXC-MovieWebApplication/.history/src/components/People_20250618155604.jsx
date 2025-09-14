import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";
import DropDown from "../templates/DropDown";
import Cards from "../templates/Cards";

const People = () => {
      document.title =`MVXC |  Shows `
  const navigate =  useNavigate()
  const [category, setcategory] = useState("airing_today");
  const [, set] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const Get =async()=>{
    try {
      const {data}= await axios.get(`//${category}?page=${page}`);
      
      if(data.results.length >0){

          set((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }
      else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Error :",error)
    }
   };

   const refresHandler =  ()=>{
    if(.length === 0){
        Get()
    }else{
         setpage(1)
         set([])
         Get();
    }
   }

   useEffect(()=>{
    refresHandler(); 
   },[category,])

  return (
    <div>People</div>
  )
}

export default People