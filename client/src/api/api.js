import axios from 'axios';

const baseURL = `http://localhost:5900/`;





export const validateUser = async(token)=>{
    try {
        const res = await axios.get(`${baseURL}api/user/signin`,{
            headers: { Authorization: "Bearer "+token}
        });
        return res.data;
    } catch (error) {
        return null;
    }
}




export const createNewUser = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}api/user/signin`, {...data});
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





export const fetchHackathons = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/get-hackathons`);
        return res.data;
    } catch (error) {
        return null;
    }
}


