import React, { useState } from 'react'
import '../utils/style.css'
import { Link } from 'react-router-dom';





const UserItem = ({name, email, date, profilePic, userID}) => {

  const formattedDate = new Date(date).toLocaleDateString();

  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <>
    <div className='flex font-bold p-2 w-full text-slate-900' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <img src={profilePic} alt='dp' className='rounded-full h-8 mx-5' />

          <h2 className='w-[33.3%] my-auto text-sm lg:text-xl hidden lg:block'>{name}</h2>
          <Link to={`/user-profile/${userID}`} className='block lg:hidden'>
            <h2 className='w-[33.3%] my-auto text-sm lg:text-xl text-blue-500'>{name}</h2>
          </Link>


        <button className={`${isHovered ? 'rotate-x' : 'rotate-back'} hidden lg:block relative left-[-5%] w-fit bg-green-parrot text-white p-1 font-normal whitespace-nowrap  rounded-md transition-all duration-150 hover:scale-75`}>
          <Link to={`/user-profile/${userID}`} className=''>
            View Profile
          </Link>
        </button>
        
  
        <a href={`mailto:${email}`}  className='lg:w-[33.3%] my-auto text-blue-500 text-sm lg:text-lg hidden lg:block'>{email}</a>
        <a href={`mailto:${email}`}  className='lg:w-[33.3%] my-auto text-blue-500 text-sm lg:text-lg visible lg:hidden'>EMAIL</a>
        <h2 className='w-[33.3%] text-center my-auto'>{formattedDate}</h2>
    </div>
    <hr className='bg-black'/>
    </>
  )
}

export default UserItem