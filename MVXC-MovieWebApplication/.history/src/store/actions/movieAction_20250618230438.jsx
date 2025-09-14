export {removemovie} from '../reducers/movieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
 
export const asyncloadmovie = (id) => async(dispatch,getState)=>{
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid  =  import React from 'react'
        
        const movieAction = () => {
          return (
            <div>movieAction</div>
          )
        }
        
        export default movieAction axios.get(`/movie/${id}/external_ids`);
        const recommendations =   import React from 'react'
        
        const movieAction = () => {
          return (
            <div>movieAction</div>
          )
        }
        
        export default movieAction axios.get(`/movie/${id}/recommendations`);
        const similar =   import React from 'react'
        
        const movieAction = () => {
          return (
            <div>movieAction</div>
          )
        }
        
        export default movieAction axios.get(`/movie/${id}/similar`);
        const videos =   import React from 'react'
        
        const movieAction = () => {
          return (
            <div>movieAction</div>
          )
        }
        
        export default movieAction axios.get(`/movie/${id}/videos`);
        const watchproviders =   import React from 'react'
        
        const movieAction = () => {
          return (
            <div>movieAction</div>
          )
        }
        
        export default movieAction axios.get(`/movie/${id}/watch/providers`);
            let theultimatedetails ={
                details:detail.data,
                externalid:externalid.data,
                recommendations:recommendations.data,
                similar:similar.data,
                videos:videos.data,
                detail:detail.data
            }
    } catch (error) {
        console.error("Error loading movie:", error);
        
    }
}