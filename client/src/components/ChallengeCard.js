import React, { useState, useEffect, useRef } from 'react';
import '../utils/style.css'
import {BsCheck2Circle} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

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
    <div className='w-[354px] text-center bg-white text-black font-semibold rounded-2xl my-5 md:my-3 lg:my-20 flex flex-col  m-auto'>
    <img alt='thumbnail' src={imageURL} className='w-[354px] h-[174px] rounded-t-2xl' />
    <div className='px-10 py-5 flex flex-col gap-5'>
      {status === 'Active' && <h5 className='bg-green-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Active</h5>}
      {status === 'Upcoming' && <h5 className='bg-orange-200 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Upcoming</h5>}
      {status === 'Past' && <h5 className='bg-red-300 w-fit m-auto p-1 rounded-md text-[0.7rem]'>Past</h5>}
      <h5 className='h-[44px]  font-[16px] '>{name}</h5>

      <div className='text-slate-600'>
        <h5 className='text-slate-600 font-[500] my-1'>
          {status === 'Active' && 'Ends in'}
          {status === 'Upcoming' && 'Starts in'}
          {status === 'Past' && 'Ended on'}
        </h5>

        {status !== 'Past' ? (
          <div className='w-fit m-auto text-xs flex flex-col gap-2'>
            <div className='flex text-xl gap-4 justify-center items-center text-center w-fit m-auto'>
              <h5 className='w-8'>{timeLeft.slice(0, 2)}</h5> :
              <h5 className='w-8'>{timeLeft.slice(4, 6)}</h5> :
              <h5 className='w-8'>{timeLeft.slice(8, 10)}</h5>
            </div>

            <div className={`flex gap-10 text-[0.7rem] w-fit m-auto ${status === 'Past' ? 'hidden' : 'block'}`}>
              <h5>Days</h5>
              <h5>Hours</h5>
              <h5>Mins</h5>
            </div>
          </div>
        ) : (
          <h2 className='text-xl h-12'>{endString}</h2>
        )}
      </div>

      <NavLink to={`/hackathon-list/${id}`} className={`bg-btn-enabled w-fit px-5 m-auto p-3 my-2 rounded-xl text-white font-[600] hover:scale-90 transition-all duration-150 ease-in flex gap-2`}>
          <BsCheck2Circle className='text-[1.35rem]' />
          <h5>Participate Now</h5>
      </NavLink>
    </div>
  </div>
  )
}

export default ChallengeCard

