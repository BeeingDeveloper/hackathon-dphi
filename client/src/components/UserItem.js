import React from 'react'

const UserItem = ({name, email, date}) => {

  

  return (
    <div className='flex font-bold gap-24 p-1'>
        <h2 className='w-[15rem] '>{name}</h2>
        <h2  className='w-[15rem]'>{email}</h2>
        <h2 className='w-[15rem]'>{date}</h2>
        <button   className='w-fit mx-5 bg-red-500 p-1 rounded-md'>REMOVE</button>
    </div>
  )
}

export default UserItem