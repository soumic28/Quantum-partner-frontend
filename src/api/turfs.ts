import axios from 'axios'
import { BACKEND_URL } from '../../config'

export async function getTurfs(){
    try{
        console.log(`${BACKEND_URL}/turf/partner`);
        const response = await axios.get(`${BACKEND_URL}/turf/partner`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        console.log(response.data.data);

        const data = response.data.data;
        
        data.forEach((turf: any) => {
            turf.sports = turf.sports.map((sport: any) => sport.name);
        });

        return data;

    } catch(error:any){
        throw new Error(error.response.data.data.message)
    }
}

export async function getTurf(id:unknown){
    try{
        const response = await axios.get(`${BACKEND_URL}/turf/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        console.log(response.data.data.turf);
        const data = response.data.data.turf;
        data.sports = data.sports.map((sport: any) => sport.name);
        return data;
    }catch(error:any){
        console.log(error.response.data.message);
        throw new Error(error.response.data.message)
    }
}
