export {removemovie} from '../reducers/movieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
 
export const asyncloadmovie = async(id) => (dispatch,getState)=>{
    try {
        const {details} = axios.get(`/movie/${id}`);
    } catch (error) {
        console.error("Error loading movie:", error);
        
    }
}