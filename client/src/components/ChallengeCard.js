import React, { useEffect, useState } from 'react'
import THUMBNAIL from '../assets/images/cardimage/Group 1000002466.png'
import '../utils/style.css'
import {BsCheck2Circle} from 'react-icons/bs'

const ChallengeCard = ({name, imageURL, description, startDate, endDate, level}) => {

    const [dayLeft, setDayLeft] = useState(0);
    const [hrsLeft, setHrsLeft] = useState(0);
    const [minLeft, setMinLeft] = useState(0);
    const [secLeft, setSecLeft] = useState(0);

    let status = '';
    
    let oneMin = 60 * 1000;
    let oneHr = 60 * oneMin;
    let oneDay = oneHr * 24;

    
    

// ===================================== HANDLING COUNTDOWN ===========================================
    let startTime = new Date(startDate).getTime();
    let systemTime = new Date().getTime();
    let endTime = new Date(endDate).getTime();

    if(startTime > systemTime){
        status = 'Upcoming';
    }else if(startTime < systemTime && endTime > systemTime){
        status = 'Active';
    }else if(endTime < systemTime){
        status = 'Past';
    }



    //================================= COUNT DOWN FUNCTION ==================================
    const countDownFunction = (remainingTime, oneDay, oneHr, oneMin)=>{

        setDayLeft(Math.floor(remainingTime / oneDay));
        setHrsLeft(Math.floor((remainingTime % oneDay) / oneHr));
        setMinLeft(Math.floor((remainingTime % oneHr) / oneMin));
        setSecLeft(Math.floor((remainingTime % oneMin) / 1000));
    }
    //================================= COUNT DOWN FUNCTION ====================================





    //================================= COUNT DOWN CALCULATOR ==================================
    const countDownCalculator = (targetDate, status)=>{
        let targetTime = new Date(targetDate).getTime();
        let systemTime = new Date().getTime();

        let remainingTime = targetTime - systemTime;

        if(status === 'Upcoming'){
            countDownFunction(remainingTime, oneDay, oneHr, oneMin);
        }
        if(status === 'Active'){
            countDownFunction(remainingTime, oneDay, oneHr, oneMin);
        }
    }
    //================================= COUNT DOWN CALCULATOR ==================================






    //================================== OPTIMISING COUNTDOWN ==================================
    const countDown =()=>{
        if(systemTime === startTime){
            setDayLeft(0);
            setHrsLeft(0);
            setMinLeft(0);
            setSecLeft(0);
        }else{
            
            // ========= IF YET TO START ============
            if(status === 'Upcoming'){
                countDownCalculator(startDate, status);
            }

            // ========= IF YET TO END ============
            if(status === 'Active'){
                countDownCalculator(endDate, status);
            }
        }
    }









    const countDownStart = ()=>{
        const timer = setInterval(() => {
            // if(status === 'Active' && status === 'Upcoming'){
                countDown();
            // }
        }, 1000);

        return ()=>clearTimeout(timer);
    }
// ===================================== HANDLING COUNTDOWN ===========================================

    // let data = <h2>Text</h2>

    // switch (status) {
    //     case 'Upcoming':
    //         data = (<h2>Upcoming</h2>)
    //         break;
    
    //     default:
    //         break;
    // }

    useEffect(() => {
        countDownStart();
    }, []);
    

  return (
    <div className='w-[354px] h-[473px] text-center bg-white text-black font-semibold rounded-2xl my-3 flex flex-col gap-2 m-10'>
        <img src={imageURL} className='w-[354px] h-[174px] rounded-t-2xl ' />
        <div className='p-5 rounded-b-2xl flex flex-col'>
            {status === 'Active' && <h3 className='bg-green-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Active</h3>}
            {status === 'Upcoming' && <h3 className='bg-orange-200 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Upcoming</h3>}
            {status === 'Past' && <h3 className='bg-red-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Past</h3>}
            <h3 className=' h-[44px] my-5 font-[16px]'>{name}</h3>
            <p className='text-slate-600 font-[500] my-1 '>
                {status === 'Active' && <h3 className='bg-green-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Ends in</h3>}
                {status === 'Upcoming' && <h3 className='bg-orange-200 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Starts in</h3>}
                {status === 'Past' && <h3 className='bg-red-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Ended on</h3>}
            </p>

            <div className=' text-slate-600 my-2 '>
                <p className='w-fit m-auto text-xs flex flex-col gap-2'>
                    <div className='flex text-2xl gap-4  justify-center items-center'>
                        <p className='w-8'>{hrsLeft<10 ? `0${hrsLeft}` : hrsLeft}</p> :
                        <p className='w-8'>{minLeft<10 ? `0${minLeft}` : minLeft} </p> :
                        <p className='w-8'>{secLeft<10 ? `0${secLeft}` : secLeft}</p>
                        {/* {data} */}
                    </div>
                    <div className='flex gap-10 text-[0.7rem]'>
                        <p>Hours</p>
                        <p>Mins</p>
                        <p>Secs</p>
                    </div>
                </p>
            </div>

            <button className='bg-green-parrot w-fit px-5 m-auto my-2 p-3 rounded-xl text-white font-[600] flex gap-2 transition-all duration-150 ease-in hover:scale-90'>
                <BsCheck2Circle className='text-[1.35rem]' />
                <p>Participate Now</p>
            </button>
        </div>
    </div>
  )
}

export default ChallengeCard