import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Popular = () => {
  const navigate =  useNavigate()
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true)
  return (
    <div>Popular</div>
  )
}

export default Popular