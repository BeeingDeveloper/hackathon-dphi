import React from 'react'
import {motion} from 'framer-motion';
import ROCKET from '../assets/images/icons/PicsArt_04-14-04.42 1.svg'
import { introFeaures } from '../data/introFeaures';
import { Link } from 'react-router-dom';



const Intro = () => {
  return (
    // <div className=' h-auto w-screen'>
        <div className=' h-auto w-screen '>
            <div className='flex h-[80%] w-[80%] flex-col lg:flex-row gap-10 m-auto my-5 lg:my-20 pb-6'>
                <div className='w-full lg:w-[65%] h-auto '>
                    <div className='flex mt-36 gap-2 lg:gap-5 w-full lg:w-[35rem] bg-regd-600'>
                        <div className='h-16 lg:h-28 w-6 bg-yellow-600'></div>
                        <div className='flex flex-col gap-5 lg:gap-10'>
                            <h2 className='text-[1.4rem] lg:text-[2.5rem] font-semibold'>Accelerate Innovation with Global AI Challenges</h2>
                            <h4 className='text-sm text-slate-300'>AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.</h4>
                            <Link to='/create-challenge'>
                                <motion.button whileHover={{scale: 0.95}} className='w-fit bg-white text-slate-900 font-semibold rounded-md p-2'>Create Challenge</motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-[35%] h-auto'>
                    <img src={ROCKET} alt='rocket' className='lg:h-[38rem] mt-5 lg:mt-20' />
                </div>
            </div>
            <div className='flex w-[100vw] h-auto background-dark justify-center items-center'>
                <div className='grid grid-cols-1 lg:flex w-[95%] lg:w-[80%] m-auto py-14 justify-between '>
                    {
                        introFeaures.map((elm, i)=>{
                            return(
                                <div  key={i} className='flex h-20 w-fit lg:w-[25%] ml-10 lg:ml-0 my-5 justify-between items-center'>
                                    <div className='flex gap-5 h-14 w-full'>
                                        <img src={elm.icon} alt='elm' />
                                        <div className='my-auto'>
                                            <h2 className='text-md'>{elm.number}</h2>
                                            <h4 className='text-md'>{elm.info}</h4>
                                        </div>
                                    </div>
                                    {i!==2?<div className='h-full w-[2px] bg-slate-600 ml-18 hidden lg:block'></div>: <></>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    // </div>
  )
}

export default Intro