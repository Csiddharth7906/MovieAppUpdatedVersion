import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "../templates/Topnav";
import DropDown from "../templates/DropDown";
import Cards from "../templates/Cards";

const People = () => {
      document.title =`MVXC | people Shows `
  const navigate =  useNavigate()
  const [category, setcategory] = useState("airing_today");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const Getpeople =async()=>{
    try {
      const {data}= await axios.get(`/people/${category}?page=${page}`);
      
      if(data.results.length >0){

          setpeople((prev)=>[...prev ,...data.results]);
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
    if(people.length === 0){
        Getpeople()
    }else{
         setpage(1)
         setpeople([])
         Getpeople();
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