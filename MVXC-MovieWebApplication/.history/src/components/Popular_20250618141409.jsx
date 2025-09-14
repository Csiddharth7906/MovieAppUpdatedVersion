import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Popular = () => {
  const navigate =  useNavigate()
  const [category, setcategory] = useState("all");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetPopular =async()=>{
    try {
      const {data}= await axios.get(`/popular/${category}?page=${page}`);
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
    <div>Popular</div>
  )
}

export default Popular