import React, { useContext, useEffect, useState } from 'react'
import {GoSmiley} from 'react-icons/go'
import {BsEmojiFrownFill, BsFillEmojiFrownFill, BsFillEmojiSmileFill} from 'react-icons/bs'
import '../utils/style.css'
import { StateContext } from '../context/StateProvider'

const CustomAlert = () => {

    const {activeAlert, setActiveAlert, alertMsg, setAlertMsg, isPositive, setIsPositive} = useContext(StateContext)


    return (
    <div className='flex  overflow-visible h-16 w-screen absolute top-20 '>

        <div className={`flex overflow-hidden bg-white w-[25rem] transition-all duration-100 shadow-xl ${isPositive ? 'shadow-green-700' : 'shadow-red-700'} m-auto ${activeAlert? 'h-12' : 'h-0'} rounded-md`}>
            <div className={`w-2 h-full bg-green-500 rounded-l-md ${isPositive? 'bg-green-500' : 'bg-red-600'}`}>
            </div>
            <div className='flex'>
                <h2 className={`text-2xl my-auto px-4 ${isPositive? 'text-green-500' : 'text-red-600'}`}>{isPositive ? <BsFillEmojiSmileFill /> :<BsFillEmojiFrownFill /> }</h2>
                <h2 className='text-slate-900 my-auto font-semibold text-center'>{alertMsg}</h2>
            </div>

        </div>


         {/* <div className={`flex transition-all ease-in duration-150 ${value === true ? "h-16" : 'h-0'} overflow-hidden bg-red-600 justify-center w-full h-full m-auto items-center  rounded-lg mt-3  z-50`}> */}
            {/* <div className={`flex h-12 w-[90%] lg:w-full my-auto   rounded-lg shadow-lg bg-white`}>
                <div className={`w-2 h-full ${isPositive? 'bg-green-500':'bg-red-500'} rounded-l-md `}></div>
                <div className='flex lg:text-xl gap-5 h-fit mt-2 mx-auto'>
                    {isPositive? (<GoSmiley className='h-fit my-auto text-green-600' />) : (<BsEmojiFrownFill className='h-fit my-auto text-red-600' />)}
                    <h2 className={`font-extrabold mt-1 ${isPositive ? 'text-green-600': 'text-red-600'}`}>{alertMsg}</h2>
                </div>
            </div> */}
        {/* </div>  */}
    </div>
  )
}

export default CustomAlert