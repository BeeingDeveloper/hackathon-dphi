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
                <h2 className='text-slate-300'>{hackathonItem?.description}</h2>

                <div className='bg-white p-2 flex gap-3 w-fit px-8 rounded-md font-bold'>
                    <BsBarChartFill className='my-1' />
                    <h2>Easy</h2>
                </div>
            </div>

            <div className='h-16 w-screen bg-white shadow-xl shadow-slate-400'> 
                <div className='w-[75%] m-auto flex justify-between'>
                    <div className='flex flex-col w-32 relative top-6'>
                        <h2 className='font-semibold text-2xl w-fit m-auto'>Overview</h2>
                        <div className='w-full h-[7px] bg-green-parrot'></div>
                    </div>

                    <div className='flex gap-5'>
                        <button className='p-2 bg-green-parrot text-white rounded-xl relative top-3 w-20 transition-all duration-150 hover:scale-75'>Edit</button>
                        <button className='p-2 border-2 border-red-500 text-red-500 rounded-xl relative top-3 w-20 transition-all duration-150 hover:scale-75'>Delete</button>
                    </div>
                </div>
            </div>

            <div className='w-[75%] m-auto mt-10'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


            </div>
        </div>
  )
}

export default ContestPage
