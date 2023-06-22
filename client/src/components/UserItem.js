import React, { useState } from 'react'
import '../utils/style.css'





const UserItem = ({name, email, date, profilePic}) => {

  const formattedDate = new Date(date).toLocaleDateString();

  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <>
    <div className='flex font-bold p-2 w-full text-slate-900' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <img src={profilePic} alt='profilePic' className='rounded-full h-8 mx-5' />
        <h2 className='w-[33.3%] my-auto'>{name}</h2>
        
        <button className={`${isHovered ? 'rotate-x' : 'rotate-back'}  relative left-[-5%] w-fit bg-green-parrot text-white p-1 font-normal whitespace-nowrap  rounded-md transition-all duration-150 hover:scale-75`}>View Profile</button>
        
        
        {/* {
          isHovered ? (
            <h2 className='absolute left-[33.3%] bg-green-parrot text-white p-1 font-normal  rounded-md transition-all duration-150 hover:scale-75

              '>View Profile</h2>
          ) : (
            <></>
          )
        } */}

        <h2  className='w-[33.3%] my-auto'>{email}</h2>
        <h2 className='w-[33.3%] text-center my-auto'>{formattedDate}</h2>
    </div>
    <hr className='bg-black'/>
    </>
  )
}

export default UserItem