import axios from 'axios';

// const serverURL = process.env.REACT_APP_SERVER_URL;
const serverURL = "http://localhost:5900";


//============================ USERS API ===============================
export const validateUser = async(token)=>{
    try {
        const res = await axios.get(`${serverURL}/api/user/signin`,{
            headers: { Authorization: "Bearer "+token}
        });
        return res.data;
    } catch (error) {
        return null;
    }
}




export const createNewUser = async(data)=>{
    try {
        const res = await axios.post(`${serverURL}/api/user/signin`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}




export const fetchUserData = async(email)=>{

    try {
        const res = await axios.get(`${serverURL}/api/user/get/${email}`);
        return res.data;
    } catch (error) {
        return null;
    }
}





export const fetchAllUsers = async()=>{

    try {
        const res = await axios.get(`${serverURL}/api/user/all-users`);
        return res.data;
    } catch (error) {
        return null;
    }
}




export const fetchUserByID = async(id)=>{
    try {
        const res = await axios.get(`${serverURL}/api/user/fetch-user/${id}`);
        return res.data;
    } catch (error) {
        return null;
    }
}



export const updateUserByID = async(id, data)=>{
    try {
        const res = await axios.put(`${serverURL}/api/user/update-user/${id}`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}
//============================ USERS API ===============================





























//========================= HACKATHONS API =============================
export const createNewHackathon = async(data)=>{
    try {
        const res = await axios.post(`${serverURL}/api/hackathon/create`, {...data});
        return res.data;
    } catch (error) {
        return null;
    }
}




//FETCH ALL HACKATHONS
export const fetchHackathons = async()=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/get-hackathons`);
        return res.data;
    } catch (error) {
        return null;
    }
}



//  UPDATED PARTICIAPANTS
export const participateContest = async (contestID, userID) => {
    try {
      const userUpdatedRes = await axios.post(`${serverURL}/api/user/get-contest/${contestID}/${userID}`);
      const contestUpdatedRes = await axios.post(`${serverURL}/api/hackathon/get-contest/${contestID}/${userID}`);

      const res = {user: userUpdatedRes, contest: contestUpdatedRes}

      return res; // Return the response data
    } catch (error) {
      console.error('Error during API call:', error); // Log the error for debugging
      return null;
    }
  };






//FETCH SINGLE HACKATHON
export const fetchHackathonByID = async(id)=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/fetch-participants/${id}`)
        return res;
    } catch (error) {
        return null;
    }
}



// FILTER BY UPCOMING CONTEST
export const filterByUpcoming = async()=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/filter/upcoming`);
        return res.data;
    } catch (error) {
        return null;
    }
}



// FITLER BY ACTIVE CONTEST
export const filterByActive = async()=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/filter/active`);
        return res.data;
    } catch (error) {
        return null;
    }
}


// FILTER BY PASSED CONTEST
export const filterByPassed = async()=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/filter/passed`);
        return res.data;
    } catch (error) {
        return null;
    }
}




//  FILTER BY LEVEL
export const filterByLevel = async(level)=>{
    try {
        const res = await axios.get(`${serverURL}/api/hackathon/filter/level/${level}`);
        console.log(res);
        return res.data;
    } catch (error) {
        return null;
    }
}