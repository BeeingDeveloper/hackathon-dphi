import axios from 'axios';

const baseURL = `http://localhost:5900/`;


export const createNewUser = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}api/user/create`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}




export const fetchUserData = async(email)=>{

    try {
        const res = await axios.get(`${baseURL}api/user/get/${email}`);
        return res.data;
    } catch (error) {
        return null;
    }
}






export const createNewHackathon = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}api/hackathon/create`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}



