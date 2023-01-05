import React from 'react';
import { challenges } from '../data/introFeaures';
import '../utils/style.css';

const Challenges = () => {
  return (
    <div  className='h-auto lg:h-screen w-screen bg-white'>
        <div className='h-auto w-[95%] lg:w-[80%] m-auto'>
          <h2 className='w-fit m-auto text-xl lg:text-3xl font-bold text-black py-20'>Why Participate in <span className='text-green-parrot'> AI Challenges?</span> </h2>
          <div className=' grid grid-cols-1 lg:grid-cols-2'>
            {
              challenges.map((elm, i)=>{
                return (
                  <div className='text-black bg-slate-200 p-5 m-5 w-fit rounded-lg'>
                    <img src={elm.icon} alt='icon' className='my-5' />
                    <h2 className='text-2xl font-bold my-5'>{elm.heading}</h2>
                    <p className='text-md text-slate-500 my-5'>{elm.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Challenges