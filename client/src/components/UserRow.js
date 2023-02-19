import React from 'react'
import { MdDelete } from 'react-icons/md';


const UserRow = ({name, email, createdAt, role, }) => {

    const modifyDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className='background-dark-green p-2 w-full flex '>
        <td className='py-2 w-[20%]'>{name}</td>
        <td className='py-2 w-[30%]'>{email}</td>
        <td className='py-2 w-[20%]'>{modifyDate}</td>
        <td className='py-2 w-[20%] '>{role}</td>
        <td className='py-2 w-[10%]  text-red-500 text-2xl'>
            <MdDelete className='w-fit m-auto' />
        </td>
    </div>
  )
}

export default UserRow