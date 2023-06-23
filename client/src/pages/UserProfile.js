import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserByID, updateUserByID } from '../api/api';
import {BsGithub} from 'react-icons/bs'
import {FaTwitter} from 'react-icons/fa'
import {BsLinkedin} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {HiMail} from 'react-icons/hi'
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
  
  //  STATE INFORMATION--------------------------------------------
  const {state} = useContext(StateContext);
  const [userData, setUserData] = useState(null);
  const ownerId = state?.user?._id;
  const userID = userData?._id;

  const [bioInput, setBioInput] = useState({
    introduction: '',
    educationalQualification: '',
    location: '',
    institutionName: '',
    github: "",
    twitter: "",
    linkedIn: "",
  });
  //---------------------------------------------------------------



  //  HANDLE CHANGE------------------------------------------------
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setBioInput((prevState)=>({
      ...prevState, [name]:value
    }))
  }

  console.log(bioInput)



  // HANDELING MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  
  //  FETCH USER BY ID
  const fetchUser = (id)=>{
    fetchUserByID(id).then((res)=>{
        setUserData(res.data)
    })
  }




  //  UDPATE USER BIO
  const updateUserBio = (id, data)=>{
    updateUserByID(id, bioInput).then((res)=>{
      console.log(res)
    }).catch(err=>console.log(err))
  }


  //  ON LOAD------------------------------------------------------
  useEffect(()=>{
    fetchUser(id);
  },[])
  //---------------------------------------------------------------




  return (
    <div>
      <div className='h-[30rem] flex flex-col gap-10 w-screen background-dark-green  p-20'>
        <div className='flex  relative w-[90%] m-auto'>
          <img src={userData?.imageURL} alt='profilePIC' className=' h-80 w-80 rounded-full' />
          
          <div className='h-full w-2 bg-green-parrot mx-20'>
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
                <form className='p-10 text-xl w-full flex flex-col'>
                  <label className='my-2'>Introduction:</label>
                  <input 
                    name='introduction'
                    value={bioInput.introduction}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />
                  
                  
                  <label className='my-2'>Educational Qualification:</label>
                  <input 
                    name='educationalQualification'
                    value={bioInput.educationalQualification}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                  
                  
                  <label className='my-2'>Location:</label>
                  <input 
                    name='location'
                    value={bioInput.location}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                  
                  
                  <label className='my-2'>Institution Name:</label>
                  <input 
                    name='institutionName'
                    value={bioInput.institutionName}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                
                  

                  <label className='my-2'>Github:</label>
                  <input 
                    name='github'
                    value={bioInput.github}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                
                  
                  <label className='my-2'>Twitter:</label>
                  <input 
                    name='twitter'
                    value={bioInput.twitter}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                
                  
                  <label className='my-2'>Linked In:</label>
                  <input 
                    name='linkedIn'
                    value={bioInput.linkedIn}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-2 w-full mb-10'  />                
                  
                  <button className='bg-green-parrot p-2 px-4 rounded-md font-semibold text-slate-200  m-auto'
                    onClick={()=>updateUserBio(ownerId, bioInput)}
                  >UPDATE</button>
                </form>
              </div>
            </Box>
          </Modal>
        {/* ======================== HANDELING MODAL ========================== */}






          <div className='text-slate-200 '>
            <h2 className='text-5xl font-semibold text-slate-200'>{userData?.name}</h2>

            <div className='leading-10 my-5 text-xl'>
              <h2><span className='font-bold text-2xl mr-5'>Introduction:</span> {userData?.introduction} I am self motivated full stack developer</h2>
              <h2><span className='font-bold text-2xl mr-5'>Educational Qualification:</span> {userData?.educationalQualification}</h2>
              <h2><span className='font-bold text-2xl mr-5'>Institution Name:</span> {userData?.institutionName}</h2>
              <h2><span className='font-bold text-2xl mr-5'>Location:</span> {userData?.location}</h2>
            </div>
            <div className=''>
              <h2 className='text-2xl font-semibold'><u>Contact:</u></h2>
              <div className='flex mt-5 gap-10'>
                {
                userData?.github &&
                  <a href={userData?.github} target='_github'>
                    <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                      <BsGithub className='my-auto' />
                      <h2>GitHub</h2>
                    </div>
                  </a>
                }

                {
                userData?.linkedIn &&
                  <a href={userData?.linkedIn} target='_linkedIn'>
                    <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                      <BsLinkedin className='my-auto' />
                      <h2>Linked In</h2>
                    </div>
                  </a>
                }

                {
                userData?.twitter &&
                <a href={userData?.twitter} target='_twitter'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                    <BsGithub className='my-auto' />
                    <h2>Twitter</h2>
                  </div>
                </a>
                }

                <a href={`mailto:${userData?.email}`} target='_email'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 px-6 rounded-md transition-all duration-75 hover:scale-90'>
                    <HiMail className='my-auto ' />
                    <h2>Email</h2>
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
