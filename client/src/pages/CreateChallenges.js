import React, {useState} from 'react'
import CALENDER from '../assets/images/icons/uil_calender.svg'
import '../utils/style.css'
import {motion} from 'framer-motion'


const CreateChallenges = () => {


    const [level, setLevel] = useState('first');

    console.log(level)
  return (
    <div className='h-auto lg:h-screen w-screen'>
        <div className='w-full h-20 bg-slate-200'>
            <div className='w-[95%] lg:w-[80%] m-auto'>
                <h2 className='text-2xl font-semibold pt-5'>Challenges Details</h2>
            </div>
        </div>

        <div className=' w-[80%] py-10 m-auto flex flex-col gap-10'>
            <div className='flex flex-col gap-5 w-[40%]'>
                <h2 className='text-lg font-semibold'>Challenge Name</h2>
                <input placeholder='enter challenge name...' className=' p-2 border border-slate-400 outline-none rounded-md' />
            </div>

            <div className='flex flex-col gap-5 w-[40%] '>
                <h2 className='text-lg font-semibold'>End Date</h2>
                <div className='bg-white w-full flex border-2 border-slate-400 outline-none rounded-md'>
                    <input placeholder='enter challenge name...' className=' p-2 w-full outline-none' />
                    <img src={CALENDER} alt='calendar' />
                </div>
            </div>

            <div className='flex flex-col gap-5 w-[40%] '>
                <h2 className='text-lg font-semibold'>End Date</h2>
                <div className='bg-white w-full flex border-2 border-slate-400 outline-none rounded-md'>
                    <input placeholder='enter challenge name...' className=' p-2 w-full outline-none' />
                    <img src={CALENDER} alt='calender' />
                </div>
            </div>

            
            <div className='flex flex-col gap-5 w-[40%] '>
                <h2 className='text-lg font-semibold'>Description</h2>
                <textarea type='text' placeholder='enter challenge name...' className='border border-slate-400 rounded-md p-2 w-[150%] outline-none' />
            </div>

            <div className='flex flex-col h-full w-[40%]'>
                <label>
                    <div  className='flex flex-col  cursor-pointer h-44 w-full p-5 bg-slate-200 rounded-md'>
                        <div className='h-full w-full bg-red-300 rounded-xl'>

                        </div>
                    </div>

                    <input
                        type='file'
                        name='upload-file'
                        accept="image/*"
                        className='w-0 h-0'
                        // onChange={uploadFile}
                    />

                </label>
            </div>


            <div className='flex flex-col gap-5 w-[40%] '>
                <select 
                    className='border border-slate-400 p-2 rounded-md w-[15rem] outline-none my-5'
                    onChange={(e)=>setLevel(e.target.value)}
                    >
                    <option  value='Level 1'>Level 1</option>
                    <option value='Level 2'>Level 2</option>
                    <option value='Level 3'>Level 3</option>
                </select>

                <motion.button whileHover={{scale: 0.95}} className='p-3 bg-green-parrot w-fit px-10 text-white rounded-md'>Save Changes</motion.button>
            </div>

        </div>
    </div>
  )
}

export default CreateChallenges