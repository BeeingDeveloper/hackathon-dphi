import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchHackathonByID } from '../api/api';
import '../utils/style.css'
import {BsBarChartFill} from 'react-icons/bs';



const ContestPage = () => {

    const {id} = useParams();
    
    const [hackathonItem, setHackathonItem] = useState(null);


    const fetchHackathonItem = (id)=>{
        fetchHackathonByID(id).then((res)=>{
            setHackathonItem(res.data);
        }).catch(err=>console.log(err))
    }


    useEffect(()=>{
        fetchHackathonItem(id);
    },[]);


    return (
        <div className=''>
            <div className='h-[30rem] flex flex-col gap-10 w-screen background-dark-green p-40'>
                <h2 className='text-4xl text-white font-semibold'>Data Sprint 72 - Butterfly Identification</h2>
                <div className='bg-white p-2 flex gap-3 w-fit px-8 rounded-md font-bold'>
                    <BsBarChartFill className='my-1' />
                    <h2>Easy</h2>
                </div>
            </div>
            <div className='h-16 w-screen bg-white shadow-xl'> 

            </div>
        </div>
  )
}

export default ContestPage

// https://firebasestorage.googleapis.com/v0/b/hackathon-649c2.appspot.com/o/Images%1675201057772-Linkin-Park.jpg?alt=media&token=86492cde-a6a7-4a47-961f-a581f21fe6a2
// https://firebasestorage.googleapis.com/v0/b/hackathon-649c2.appspot.com/o/Images%2F1675201057772-Linkin-Park.jpg?alt=media&token=86492cde-a6a7-4a47-961f-a581f21fe6a2