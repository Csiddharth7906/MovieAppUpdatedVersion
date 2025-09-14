import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Popular = () => {
  const navigate =  useNavigate()
  const [category, setcategory] = useState("all");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetTrending =async()=>{
    try {
      const {data}= await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length >0){

          setp((prev)=>[...prev ,...data.results]);
          setpage(page+1)
      }else{
            sethasmore(false)
      }

  
    
    } catch (error) {
      console.log("Errror :",error)
    }
   };

   const refresHandler =  ()=>{
    if(trending.length === 0){
        GetTrending()
    }else{
         setpage(1)
         setpopular([])
         GetTrending();
    }
   }

   useEffect(()=>{
    refresHandler(); 
   },[category,duration])


  return (
    <div>Popular</div>
  )
}

export default Popular