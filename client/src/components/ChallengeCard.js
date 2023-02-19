import React, { useEffect, useState } from 'react'
import THUMBNAIL from '../assets/images/cardimage/Group 1000002466.png'
import '../utils/style.css'
import {BsCheck2Circle} from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'

const ChallengeCard = ({name, imageURL, description, startDate, endDate, level, elm}) => {

    const encodedIMG = encodeURIComponent(imageURL);
    // console.log(decodeURIComponent(encodedIMG))

    const [dayLeft, setDayLeft] = useState(0);
    const [hrsLeft, setHrsLeft] = useState(0);
    const [minLeft, setMinLeft] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

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





    //================================== MANAGING END DATE ===========================================
    let challengeEndDate = '';
    let challengeEndTime = '';

    if(status === 'Past'){
        challengeEndDate = new Date(endDate).toDateString();
        challengeEndTime = new Date(endDate).toLocaleTimeString();
    }
    let modifyDay = challengeEndDate.slice(8, 10);
    let modifyTime = '';
    // console.log(challengeEndTime.length)

    
    let addSuffixTodate = '';


    if(modifyDay.length === 1){
        if(modifyDay === 1){
            addSuffixTodate = `${modifyDay}st`;
        }else if(modifyDay === 2){
            addSuffixTodate = `${modifyDay}nd`;
        }else if(modifyDay === 3){
            addSuffixTodate = `${modifyDay}rd`;
        }else{
            addSuffixTodate = `${modifyDay}th`;
        }
    }else{
        if(modifyDay.charAt(1) === 1){
            addSuffixTodate = `${modifyDay}st`;
        }else if(modifyDay === 2){
            addSuffixTodate = `${modifyDay}nd`;
        }else if(modifyDay === 3){
            addSuffixTodate = `${modifyDay}rd`;
        }else{
            addSuffixTodate = `${modifyDay}th`;
        }
    }
    
    if(challengeEndTime.length === 10){
        modifyTime = `${challengeEndTime.slice(0, 4)} ${challengeEndTime.slice(8, 11)}`
    }


    let modifyEndDate = `${addSuffixTodate} 
                        ${challengeEndDate.slice(4, 7)}'
                        ${challengeEndDate.slice(13, 15)} 
                        ${modifyTime}`


    //================================== MANAGING END DATE ===========================================









    //================================= COUNT DOWN FUNCTION ==================================
    const countDownFunction = (remainingTime, oneDay, oneHr, oneMin)=>{

        setDayLeft(Math.floor(remainingTime / oneDay));
        setHrsLeft(Math.floor((remainingTime % oneDay) / oneHr));
        setMinLeft(Math.floor((remainingTime % oneHr) / oneMin));
        // setSecLeft(Math.floor((remainingTime % oneMin) / 1000));
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
            // setSecLeft(0);
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
    //================================== OPTIMISING COUNTDOWN ==================================







    const countDownStart = ()=>{
        const timer = setInterval(() => {
            countDown();
        }, 1000);

        return ()=>clearTimeout(timer);
    }
// ===================================== HANDLING COUNTDOWN ===========================================


    useEffect(() => {
        if(status === 'Active' || status === 'Upcoming'){
                countDownStart();
                setIsDisabled(false)
        }
    }, []);
    

  return (
    <div className='w-[354px] text-center bg-white text-black font-semibold rounded-2xl my-3 flex flex-col gap-2 m-10'>
        <img src={imageURL} className='w-[354px] h-[174px] rounded-t-2xl ' />
        <div className='px-10 py-5 flex flex-col gap-5'>
            {status === 'Active' && <h3 className='bg-green-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Active</h3>}
            {status === 'Upcoming' && <h3 className='bg-orange-200 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Upcoming</h3>}
            {status === 'Past' && <h3 className='bg-red-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Past</h3>}
            <h3 className=' h-[44px]  font-[16px] '>{name}</h3>
            
            
            <div className=' text-slate-600 '>
                <p className='text-slate-600 font-[500] my-1 '>
                    {status === 'Active' && <h3 className='w-fit m-auto p-1 rounded-md text-[14px]'>Ends in</h3>}
                    {status === 'Upcoming' && <h3 className='w-fit m-auto p-1 rounded-md text-[14px]'>Starts in</h3>}
                    {status === 'Past' && <h3 className='w-fit m-auto p-1 rounded-md text-[14px]'>Ended on</h3>}
                </p>          

                <p className='w-fit m-auto text-xs flex flex-col gap-2'>
                    {challengeEndDate ? (
                        <h2 className='text-xl'>{modifyEndDate}</h2>
                    ) : (
                        <div className='flex text-xl gap-4  justify-center items-center'>
                            <p className='w-8'>{dayLeft<10 ? `0${dayLeft}` : dayLeft}</p> :
                            <p className='w-8'>{hrsLeft<10 ? `0${hrsLeft}` : hrsLeft} </p> :
                            <p className='w-8'>{minLeft<10 ? `0${minLeft}` : minLeft}</p>
                        </div>
                    )}

                    <div className={`flex gap-10 text-[0.7rem] w-fit m-auto ${status === 'Past' ? 'hidden': 'block'}`}>
                        <p>Days</p>
                        <p>Hours</p>
                        <p>Mins</p>
                    </div>
                </p>
            </div>

            <NavLink to={`/hackathon-list/${name}/${description}/${startDate}/${endDate}/${level}/${encodedIMG}`}>
                <button disabled={isDisabled} 
                        className={ `${isDisabled ? 'bg-btn-disabled' : 'bg-btn-enabled'} w-fit px-5 m-auto p-3 my-2 rounded-xl text-white font-[600] 
                                    flex gap-2  ${isDisabled ? 'hover:scale-100' : 'transition-all duration-150 ease-in hover:scale-90'}`}>
                    <BsCheck2Circle className='text-[1.35rem]' />
                    <p>Participate Now</p>
                </button>
            </NavLink>
        </div>
    </div>
  )
}

export default ChallengeCard

