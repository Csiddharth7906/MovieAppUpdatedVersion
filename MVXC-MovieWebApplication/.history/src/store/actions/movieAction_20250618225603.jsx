export {removemovie} from '../reducers/movieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
 
export const asyncloadmovie = async(id) => (dispatch,getState)=>{
    try {
        const detail = axios.get(`/movie/${id}`);
        const externalid = axios.get(`/movie/${id}/external_ids`);
        const recommendations = axios.get(`/movie/${id}/recommendations`);
        const similar

    } catch (error) {
        console.error("Error loading movie:", error);
        
    }
}