import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../api/api';
import {BsGithub} from 'react-icons/bs'
import {FaTwitter} from 'react-icons/fa'
import {BsLinkedin} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { StateContext } from '../context/StateProvider';
import '../utils/style.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',

};




const UserProfile = () => {
  const { id } = useParams();
  
  const {state} = useContext(StateContext);
  const [userData, setUserData] = useState(null);
  
  const ownerId = state?.user?._id;
  const userID = userData?._id;

  //    HANDELING MODAL==========================
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  const fetchUser = (id)=>{
    fetchUserByID(id).then((res)=>{
        setUserData(res.data)
    })
  }


  useEffect(()=>{
    fetchUser(id);
  },[])


  return (
    <div>
      <div className='h-[30rem] flex flex-col gap-10 w-screen background-dark-green  p-20'>
        <div className='flex  relative'>
          <img src={userData?.imageURL} alt='profilePIC' className=' h-80 w-80 rounded-full' />
          
          <div className='h-full w-2 bg-green-800 mx-20'>
          </div>


        {/* ======================== HANDELING MODAL ========================== */}
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='w-full h-full rounded-[10px]'>
                <h2 className='text-2xl font-semibold rounded-t-[10px] py-2 text-center bg-green-parrot text-slate-200'>UPDATE INFORMATION</h2>
                <form className='p-10 text-xl'>
                  <label className='my-2'>Introduction:</label>
                  <input className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />
                  
                  
                  <label className='my-2'>Educational Qualification:</label>
                  <input className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />
                  
                  
                  <label className='my-2'>Location:</label>
                  <input className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />
                </form>
              </div>
            </Box>
          </Modal>
        {/* ======================== HANDELING MODAL ========================== */}






          <div className='text-slate-200 '>
            <h2 className='text-5xl font-semibold text-slate-200'>{userData?.name}</h2>

            <div className='leading-10 my-5 text-xl'>
              <h2><span className='font-bold text-2xl'>Introduction:</span> I am self motivated full stack developer</h2>
              <h2><span className='font-bold text-2xl'>Educational Qualification:</span> Bachelor Of Computer Application</h2>
              <h2><span className='font-bold text-2xl'>Location:</span> Mumbai, India</h2>
            </div>
            <div className=''>
              <h2 className='text-2xl font-semibold'><u>Contact:</u></h2>
              <div className='flex mt-5 gap-10'>
                <a href='https://facebook.com'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                    <BsGithub className='my-auto' />
                    <h2>GitHub</h2>
                  </div>
                </a>

                <a href='https://facebook.com'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                    <BsLinkedin className='my-auto' />
                    <h2>Linked In</h2>
                  </div>
                </a>

                <a href='https://facebook.com'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                    <BsGithub className='my-auto' />
                    <h2>Twitter</h2>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {
            ownerId === userID ?   <button 
                                      onClick={()=>setOpen(true)}
                                      className='flex gap-3 bg-green-parrot h-fit p-2 px-4 rounded-md absolute top-0 right-0 text-2xl font-bold text-slate-300 transition-all duration-150 hover:scale-90'>
                                    <FiEdit className='mt-[2px]' />
                                    <h2>UPDATE</h2>
                                  </button> : <></>
          }


        </div>
      </div>

    </div>
  );
};

export default UserProfile;
