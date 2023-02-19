import React, { useContext, useEffect } from 'react'
import { fetchAllUsers } from '../api/api';
import UserRow from '../components/UserRow';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'

const DashboardUser = () => {

  const {state, dispatch} = useContext(StateContext);
  const {allUsers} = state;

  useEffect(() => {
    fetchAllUsers().then((res)=>{
      dispatch({type: actionType.SET_ALL_USERS, allUsers: res.data});
    });
  }, []);

  


  return (
    <div className='w-full '>
      <div>
        {/* ================= SEARCH FUNCTIONALITY=============== */}
      </div>

      <div className='w-full'>
        <div className='w-full bg-green-parrot p-2 font-semibold text-xl rounded-t-md flex justify-between'>
          <h4 className='py-2 w-[20%]'>Name</h4>
          <h4 className='py-2 w-[30%]'>Email</h4>
          <h4 className='py-2 w-[20%]'>Created At</h4>
          <h4 className='py-2 w-[20%]'>Role</h4>
          <h4 className='py-2 w-[10%]'>Delete</h4>
        </div>

        <div className='w-full'>
          {
            allUsers?.map((elm, i)=>{
              return <UserRow key={i} name={elm.name} email={elm.email} createdAt={elm.createdAt} role={elm.role} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardUser


// {
//   allUsers?.map((elm)=>{
//     return(
//       <>
//         <UserRow name={elm.name} email={elm.email} createdAt={elm.createdAt} />
//       </>
//     )
//   })
// }