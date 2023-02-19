import React, { useContext, useEffect } from 'react'
import {RiSearchLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fetchHackathons } from '../api/api'
import { actionType } from '../context/reducer'
import { StateContext } from '../context/StateProvider'
import ChallengeCard from './ChallengeCard'

const ContestList = () => {

    const {state, dispatch} = useContext(StateContext);
    const {hackathons} = state;

    useEffect(() => {
        fetchHackathons().then((res)=>{
            dispatch({type: actionType.SET_HACKTHONS, hackathons: res.data});
        })
    }, [])
    
    // console.log(hackathons)

  return (
    <div className='h-auto lg:h-screen w-screen '>
        <div className='w-full background-dark'>
            <div className='w-[95%] lg:w-[80%] m-auto py-20 flex flex-col'>
                <h2 className='w-fit m-auto text-2xl font-semibold my-10'>Explore Challenges</h2>
                <div className=' w-full lg:w-[75%] m-auto flex gap-5  justify-between text-black pb-10'>
                    <div className='flex bg-white rounded-md w-full py-2'>
                        <RiSearchLine className='my-auto text-2xl ml-5' />
                        <input className='bg-white rounded-md w-full outline-none ml-2' />
                    </div>
                    <button className='bg-white p-2 px-4 rounded-md font-semibold'>Filter</button>
                </div>
                <div className=''>
                    <div className='flex'>
                        <h2>buttons</h2>
                    </div>
                </div>
            </div>

            <div className='w-[95%] lg:w-[80%] m-auto  flex flex-col'>

            </div>
        </div>
        <div className='w-[95%] lg:w-[85%] m-auto h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20'>
            {
                hackathons?.map((elm, i)=>{
                    return (
                            <ChallengeCard 
                                key={i}
                                name={elm.name} 
                                imageURL={elm.imageURL} 
                                description={elm.description} 
                                startDate={elm.startDate}
                                endDate={elm.endDate}
                                level={elm.level}
                                // elm={elm}
                                />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ContestList