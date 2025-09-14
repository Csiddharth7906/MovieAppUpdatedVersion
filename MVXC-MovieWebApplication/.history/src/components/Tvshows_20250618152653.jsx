import React from 'react'

const Tvshows = () => {
            document.title =`MVXC | Movies `
  const navigate =  useNavigate()
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
    const GetMovie =async()=>{
    try {
      const {data}= await axios.get(`/movie/${category}?page=${page}`);
      
      
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
    <div>Tvshows</div>
  )
}

export default Tvshows