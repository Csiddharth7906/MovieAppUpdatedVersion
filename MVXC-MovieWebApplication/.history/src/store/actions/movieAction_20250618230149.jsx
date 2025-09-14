export {removemovie} from '../reducers/movieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
 
export const asyncloadmovie = async(id) => (dispatch,getState)=>{
    try {
        const detail = axios.get(`/movie/${id}`);
        const externalid = axios.get(`/movie/${id}/external_ids`);
        const recommendations = axios.get(`/movie/${id}/recommendations`);
        const similar = axios.get(`/movie/${id}/similar`);
        const videos = axios.get(`/movie/${id}/videos`);
        const watchproviders = axios.get(`/movie/${id}/watch/providers`);
            let theultimatedetails ={
                details:detail.data,
                externalid:externalid.data,
                recommendations:recommendations.data,
                similar:similar.data,
                videos:videos.data,
                details:detail.data
            }
    } catch (error) {
        console.error("Error loading movie:", error);
        
    }
}