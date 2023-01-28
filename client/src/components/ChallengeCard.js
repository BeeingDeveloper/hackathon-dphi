import React, { useEffect, useState } from 'react'
import THUMBNAIL from '../assets/images/cardimage/Group 1000002466.png'
import '../utils/style.css'
import {BsCheck2Circle} from 'react-icons/bs'

const ChallengeCard = ({name, imageURL, description, startDate, endDate, level}) => {

    const status = '';

    //CONVERT TIME TO MONGODB------------------------------------------------------------------
    const convertDefaultDate = (systemDate)=>{
        const localDate = systemDate.toLocaleDateString();
        const localTime = systemDate.toTimeString();
        let getDay = localDate.split('/')[1];
        let getMonth =  localDate.split('/')[0];
        let getYear = systemDate.getFullYear();

        getDay = getDay < 10 ? `0${getDay}` : getDay;
        getMonth = getMonth < 10 ? `0${getMonth}` : getMonth;

        const finalTime = `${getYear}-${getMonth}-${getDay}T${localTime.slice(0,8)}.000+00:00`
        return finalTime;
    }
    //-----------------------------------------------------------------------------------------


    // 2023-01-28T00:55:25.000+00:00
    // 2023-01-29T12:00:00.000Z
// Sun Jan 29 2023 17:30:00 GMT+0530 (India Standard Time)
// Sat Jan 28 2023 01:39:44 GMT+0530 (India Standard Time)



    const [dayLeft, setDayLeft] = useState(0);
    const [minLeft, setMinLeft] = useState(0);
    const [secLeft, setSecLeft] = useState(0);
    



    useEffect(() => {
      const timer = setInterval(()=>{
        const contestStartDate = new Date(startDate);
        const systemDate = new Date();

        setDayLeft(contestStartDate.getDate() - systemDate.getDate());
        setMinLeft(contestStartDate.getMinutes() - systemDate.getMinutes());

        console.log(new Date().toLocaleDateString(contestStartDate - systemDate))
      }, 1000)
    
      return () => clearInterval(timer);
    }, [])
    

  return (
    <div className='w-[354px] text-center bg-white text-black font-semibold rounded-2xl m-auto my-3 flex flex-col gap-2'>
        <img src={imageURL} className='w-[354px] h-[174px] rounded-t-2xl ' />
        <div className='p-5 rounded-b-2xl flex flex-col'>
            {status === 'Active' && <h3 className='bg-green-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Active</h3>}
            {status === 'Upcoming' && <h3 className='bg-orange-200 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Upcoming</h3>}
            {status === 'Past' && <h3 className='bg-red-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Past</h3>}
            <h3 className='text-xl h-16 my-5'>{name}</h3>
            <p className='text-slate-600 font-[500] my-2'>Starts in</p>

            <div className=' text-slate-600 my-5'>
                <p className='w-fit m-auto text-2xl'></p>
                <p className='w-fit m-auto text-xs flex flex-col gap-2'>
                    <p>{"leftTime"}</p>
                    <p>Days</p> : <p>Hours</p> : <p>Min</p>
                </p>
            </div>

            <button className='bg-green-parrot w-fit px-5 m-auto p-3 rounded-xl text-white font-[600] flex gap-2'>
                <BsCheck2Circle className='text-[1.35rem]' />
                <p>Participate Now</p>
            </button>
        </div>
    </div>
  )
}

export default ChallengeCard