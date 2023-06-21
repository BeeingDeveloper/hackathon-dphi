import axios from 'axios';

const baseURL = `http://localhost:5900/`;




//============================ USERS API ===============================
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





export const fetchAllUsers = async()=>{

    try {
        const res = await axios.get(`${baseURL}api/user/all-users`);
        return res.data;
    } catch (error) {
        return null;
    }
}
//============================ USERS API ===============================














//========================= HACKATHONS API =============================
export const createNewHackathon = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}api/hackathon/create`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}




//FETCH ALL HACKATHONS
export const fetchHackathons = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/get-hackathons`);
        return res.data;
    } catch (error) {
        return null;
    }
}



//  UPDATED PARTICIAPANTS
export const participateContest = async(contestID, userID)=>{
    try {
        const res = await axios.post(`${baseURL}api/hackathon/get-contest/${contestID}/${userID}`);
        return res;
    } catch (error) {
        return null;
    }
}






//FETCH SINGLE HACKATHON
export const fetchHackathonByID = async(id)=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/fetch-participants/${id}`)
        return res;
    } catch (error) {
        return null;
    }
}



// FILTER BY UPCOMING CONTEST
export const filterByUpcoming = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/filter/upcoming`);
        return res.data;
    } catch (error) {
        return null;
    }
}



// FITLER BY ACTIVE CONTEST
export const filterByActive = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/filter/active`);
        return res.data;
    } catch (error) {
        return null;
    }
}


// FILTER BY PASSED CONTEST
export const filterByPassed = async()=>{
    try {
        const res = await axios.get(`${baseURL}api/hackathon/filter/passed`);
        return res.data;
    } catch (error) {
        return null;
    }
}