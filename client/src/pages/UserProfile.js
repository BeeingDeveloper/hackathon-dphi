import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../api/api';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);


  const fetchUser = (id)=>{
    fetchUserByID(id).then((res)=>{
        setUserData(res.data)
    })
  }


  useEffect(()=>{
    fetchUser(id);
  },[])


  return (
    <div>
      <h1>User Profile</h1>

    </div>
  );
};

export default UserProfile;
