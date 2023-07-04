import React, { useState, useEffect, useRef, startTransition } from 'react';
import THUMBNAIL from '../assets/images/cardimage/Group 1000002466.png'
import '../utils/style.css'
import {BsCheck2Circle} from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'

const ChallengeCard = ({name, id, imageURL, description, startDate, endDate, level, elm}) => {

    const timerRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState('');
    const contestStartTime = new Date(startDate).getTime();
    const contestEndTime = new Date(endDate).getTime();
    const [status, setStatus] = useState('');
    const [endString, setEndString] = useState('');
    


    const countDown = (destination)=>{
      if (timerRef.current) return; // Timer already started

      timerRef.current = setInterval(()=>{
        const currentTime = new Date().getTime();
        const distance = destination - currentTime;
        

        if(distance <= 0){
          clearInterval(timerRef.current);
          timerRef.current = null;
          return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if(days < 10){days = `0${days}`}
        if(hours < 10){hours = `0${hours}`}
        if(minutes < 10){minutes = `0${minutes}`}
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      },1000);
    }



    useEffect(() => {
        if(new Date(endDate) < new Date() ){
          setStatus('Past');
            let endDateStr = new Date(endDate);
            let day = endDateStr.getDate();
            let month = endDateStr.toLocaleString('default', { month: 'long' });
            let year = endDateStr.getFullYear();

            let hour = endDateStr.getHours();
            let mint = endDateStr.getMinutes();

        // console.log(new Date(endDate))
            let suffix = "";
            if (hour >= 12) {
              suffix = "PM";
              if (hour > 12) {
                hour -= 12;
              }
            } else {
              suffix = "AM";
            }
            year = year.toLocaleString().slice(3,5);
            setEndString(`${day < 10 ? "0"+day : day } ${month}'${year} ${hour<10 ? "0"+hour : hour} : ${mint<10 ? "0"+mint : mint} ${suffix}`)
            return;
        }
        if(new Date(startDate) > new Date()){
          countDown(contestStartTime);
          setStatus('Upcoming');
        }
        if(new Date(startDate) < new Date() && new Date(endDate) > new Date()){
          countDown(contestEndTime);
          setStatus('Active')
        }

        return () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };
    }, [contestEndTime, endDate, startDate]);


    

  return (
    <div className='w-[354px] text-center bg-white text-black font-semibold rounded-2xl  md:my-3 lg:my-20 flex flex-col  m-auto '>
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

                {
                  status !== 'Past' ? (
                    <p className='w-fit m-auto text-xs flex flex-col gap-2'>
                        <div className='flex text-xl gap-4  justify-center items-center text-center w-fit m-auto'>
                            <p className='w-8'>{timeLeft.slice(0,2)}</p> :
                            <p className='w-8'>{timeLeft.slice(4, 6)}</p> :
                            <p className='w-8'>{timeLeft.slice(8, 10)}</p>
                         </div>

                        <div className={`flex gap-10 text-[0.7rem] w-fit m-auto ${status === 'Past' ? 'hidden': 'block'}`}>
                            <p>Days</p>
                            <p>Hours</p>
                            <p>Mins</p>
                        </div>
                    </p>
                  ) : (
                    <h2 className='text-xl h-12'>{endString}</h2>
                  )
                }
            </div>

            <NavLink to={`/hackathon-list/${id}`}>
                <button
                        className={ `bg-btn-enabled w-fit px-5 m-auto p-3 my-2 rounded-xl text-white font-[600] hover:scale-90 transition-all duration-150 ease-in 
                                    flex gap-2 `}>
                    <BsCheck2Circle className='text-[1.35rem]' />
                    <p>Participate Now</p>
                </button>
            </NavLink>
        </div>
    </div>
  )
}

export default ChallengeCard

