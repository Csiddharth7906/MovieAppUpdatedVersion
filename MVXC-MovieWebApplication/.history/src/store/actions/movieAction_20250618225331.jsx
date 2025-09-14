export {removemovie} from '../reducers/movieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
 
export const asyncloadmovie = async(id) => (dispatch,getState)=>{
    try {
        const {data} = await axios.get(`/movie/${id}`, {
            params: {
                append_to_response: 'videos,credits,images,similar,recommendations,watch/providers'
            }
        });
    } catch (error) {
        console.error("Error loading movie:", error);
        
    }
}