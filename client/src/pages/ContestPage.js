import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchHackathonByID, participateContest } from '../api/api';
import '../utils/style.css'
import {BsBarChartFill} from 'react-icons/bs';
import UserItem from '../components/UserItem';
import { StateContext } from '../context/StateProvider';



const ContestPage = () => {

    const {id} = useParams();
    
    const [hackathonItem, setHackathonItem] = useState(null);
    const [participants, setParticipants] = useState(null);


    const {state} = useContext(StateContext);
    const userID = state?.user?._id;


    const fetchHackathonItem = (id)=>{
        fetchHackathonByID(id).then((res)=>{
            setParticipants(res.data.participants);
            setHackathonItem(res.data);
        }).catch(err=>console.log(err))
    }

    const [tab, setTab]= useState(1);

    const participate = (contestID, userID)=>{
        participateContest(contestID, userID).then((res)=>{
            setParticipants(res.data.data.participants);
        }).catch(err=>console.log(err));
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

                <button className=' text-left' onClick={()=>participate(id, userID)}>
                    PARTICIPATE
                </button>
            </div>

            <div className='h-16 w-screen bg-white shadow-xl shadow-slate-400'> 
                <div className='w-[75%] m-auto flex justify-between'>
                    <div className='flex w-fit gap-5 relative top-5'>
                        <div className='flex flex-col' onClick={()=>setTab(1)} >
                            <h2 className='font-semibold text-2xl w-fit m-auto'>Overview</h2>
                            <div className={` transition-all duration-150 top-10 h-[7px] bg-green-parrot absolute ${tab == 1 ? 'left-0 w-32' : 'left-[8rem] w-[12rem]'}`}></div>
                        </div>
                        <h2
                            onClick={()=>setTab(2)} 
                            className='font-semibold text-2xl w-fit m-auto '>Participant List</h2>

                    </div>

                    <div className='flex gap-5'>
                        <button className='p-2 bg-green-parrot text-white rounded-xl relative top-3 w-20 transition-all duration-150 hover:scale-75'>Edit</button>
                        <button className='p-2 border-2 border-red-500 text-red-500 rounded-xl relative top-3 w-20 transition-all duration-150 hover:scale-75'>Delete</button>
                    </div>
                </div>
            </div>

            {
                tab == 1 ? (
                    <div className='w-[75%] m-auto mt-10'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        
                    </div>
                ) : (
                    <div className='w-[75%] m-auto mt-10'>
                        <div className='flex w-full justify-between bg-slate-500 p-1 rounded-t-md'>
                            <h1>Name</h1>
                            <h1>Email</h1>
                            <h1>Date of Join</h1>
                            <h1>Action</h1>
                        </div>
                        {
                            participants?.map((elm, i)=>{
                                return (
                                    <UserItem key={i} name={elm.name} email={elm.email} date={'daga'} /> 
                                
                                )
                            })
                        }

                        
                    </div>
                )
            }


        </div>
  )
}

export default ContestPage
