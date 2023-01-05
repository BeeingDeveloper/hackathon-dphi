import React from 'react'
import {RiSearchLine} from 'react-icons/ri'


const ContestList = () => {
  return (
    <div className='h-auto lg:h-screen w-screen'>
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
                <div className=' '>
                    <div className='flex'>
                        <h2>buttons</h2>
                    </div>
                </div>
            </div>

            <div className=''>

            </div>
        </div>
    </div>
  )
}

export default ContestList