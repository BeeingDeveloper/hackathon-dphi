import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserByID, updateUserByID } from '../api/api';
import {BsGithub} from 'react-icons/bs'
import {FaFilePdf, FaTwitter} from 'react-icons/fa'
import {BsLinkedin} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {HiMail} from 'react-icons/hi'
import { StateContext } from '../context/StateProvider';
import '../utils/style.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {storage, firebaseApp} from '../config/firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useTheme } from '@mui/material';
import ChallengeCard from '../components/ChallengeCard';







const UserProfile = () => {

  const theme = useTheme();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
     width:{xs:350, lg: 700},
     height: {xs: 700, lg:820},
     overflow: 'scroll',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      maxWidth: 280,
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
  };




  const { id } = useParams();
  
  //  STATE INFORMATION--------------------------------------------
  const {state, setActiveAlert, setIsPositive, setAlertMsg} = useContext(StateContext);
  const [userData, setUserData] = useState(null);
  const ownerId = state?.user?._id;
  const userID = userData?._id;



  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bioInput, setBioInput] = useState({
    introduction: '',
    educationalQualification: '',
    location: '',
    institutionName: '',
    github: "",
    twitter: "",
    linkedIn: "",
    resume: ""
  });
  //---------------------------------------------------------------



  //  HANDLE CHANGE------------------------------------------------
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setBioInput((prevState)=>({
      ...prevState, [name]:value
    }));
  }




  // HANDELING MODAL
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);



  
  //  FETCH USER BY ID
  const fetchUser = (id)=>{
    fetchUserByID(id).then((res)=>{
        setUserData(res.data)
    })
  }



  //  UDPATE USER BIO
  const updateUserBio = (id, data)=>{
    setActiveAlert(true)          
    setAlertMsg("Required All fields");
    setIsPositive(false);

    if( !data.introduction || !data.educationalQualification || !data.location || !data.institutionName || !data.github || !data.twitter || !data.linkedIn || !data.resume){

    }else{
      updateUserByID(id, data).then((res)=>{
        setActiveAlert(true)          
        setAlertMsg("Required All fields");
        setIsPositive(true);
  
        setTimeout(()=>{
            setActiveAlert(false);
            setAlertMsg("");    
        },3000) 
      }).catch(err=>console.log(err))      
    }
  }



  //  ON CHANGE FILE
  const handleFile = (e)=>{

    if(bioInput.resume){
      deleteFile(bioInput.resume);
    }


    setIsUploading(true);
    const fileItem = e.target.files[0];
    const storageRef = ref(storage, `/ResumeFiles/${state?.user?.name}-${fileItem.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileItem);

    uploadTask.on("state_changed", (snapshot)=>{
      setUploadProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100 ));
      },
      (err)=>{
          console.log(err)
      },
      ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((itemURL)=>{
              setBioInput(prevState=>({...prevState, resume: itemURL}));
              setIsUploading(false)
          })
      }
    )
  }




  //  DELETE EXISTING FILE
  const deleteFile = (fileURL)=>{
    const deleteRef = ref(storage, fileURL);
    deleteObject(deleteRef).then(()=>{
      console.log("itemDeleted")
    })
  }




  //  ON LOAD------------------------------------------------------
  useEffect(()=>{
    document.title = "Profile | Ai Planet";
    fetchUser(id);
  },[])
  //---------------------------------------------------------------


  return (
    <div className='w-screen'>
      <div className='h-auto lg:h-[30rem] flex flex-col gap-10 w-full background-dark-green p-4 lg:p-20'>
        <div className='flex  relative w-full lg:w-[85%] m-auto flex-col lg:flex-row h-full'>
          <img src={userData?.imageURL} alt='profilePIC' className='  w-[80%] my-auto lg:m-0 lg:w-64 lg:h-64 relative top-5  rounded-full' />
          
          <div className='h-full min-w-[8px] bg-green-parrot mx-10'>
          </div>


        {/* ======================== HANDELING MODAL ========================== */}
          <Modal
          className='text-sm'
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='w-full h-full rounded-[10px]'>
                <h2 className='text-xl font-semibold rounded-t-[10px] py-2 text-center bg-green-parrot text-slate-200'>UPDATE INFORMATION</h2>
                <div className=' p-2 lg:p-10 text-lg w-full flex flex-col '>
                  <label className='my-2'>Introduction:</label>
                  <input 
                    name='introduction'
                    required
                    value={bioInput.introduction}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />
                  
                  
                  <label className='my-2'>Educational Qualification:</label>
                  <input 
                    name='educationalQualification'
                    required
                    value={bioInput.educationalQualification}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                  
                  
                  <label className='my-2'>Location:</label>
                  <input 
                    name='location'
                    required
                    value={bioInput.location}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                  
                  
                  <label className='my-2'>Institution Name:</label>
                  <input 
                    name='institutionName'
                    required
                    value={bioInput.institutionName}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                
                  

                  <label className='my-2'>Github:</label>
                  <input 
                    name='github'
                    required
                    value={bioInput.github}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                
                  
                  <label className='my-2'>Twitter:</label>
                  <input 
                    name='twitter'
                    required
                    value={bioInput.twitter}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                
                  
                  <label className='my-2 '>Linked In:</label>
                  <input 
                    name='linkedIn'
                    required
                    value={bioInput.linkedIn}
                    onChange={handleChange}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                
                  
                  <label className='my-2 flex justify-between'>
                    <h2>Resume:</h2>
                    <h2 className='text-green-600'>{isUploading ? `${uploadProgress}%` : ""}</h2>
                    </label>
                  <input 
                    type='file'
                    accept='application/pdf'
                    name='resume'
                    required
                    onChange={handleFile}
                    className='bg-slate-300 outline-none rounded-md block p-1 w-full mb-5'  />                
                  
                  <button 
                    className='bg-green-parrot p-2 px-4 rounded-md font-semibold text-slate-200  m-auto'
                    onClick={()=>updateUserBio(ownerId, bioInput)}
                  >UPDATE</button>
                </div>
              </div>
            </Box>
          </Modal>
        {/* ======================== HANDELING MODAL ========================== */}






          <div className='text-slate-200 pt-10 lg:pt-0'>
            <h2 className='text-xl lg:text-2xl font-semibold text-slate-200'>{userData?.name}</h2>

            <div className='leading-10 my-5 text-xl  lg:pt-0 flex flex-col gap-3'>
              <h2 className='text-sm lg:text-xl'><span className='font-bold text-lg lg:text-lg mr-5'>Introduction:</span> <i>{userData?.introduction} </i></h2>
              <h2 className='text-sm lg:text-xl'><span className='font-bold text-lg lg:text-lg mr-5'>Educational Qualification:</span> <i>{userData?.educationalQualification}</i></h2>
              <h2 className='text-sm lg:text-xl'><span className='font-bold text-lg lg:text-lg mr-5'>Institution Name:</span> <i>{userData?.institutionName}</i></h2>
              <h2 className='text-sm lg:text-xl'><span className='font-bold text-lg lg:text-lg mr-5'>Location:</span> <i>{userData?.location}</i></h2>
            </div>
            <div className='py-5 lg:py-0'>
              <h2 className='text-2xl font-semibold'><u>Contact:</u></h2>
              <div className='flex mt-5 flex-col lg:flex-row gap-2'>
                {
                userData?.github &&
                  <a href={userData?.github} target='_github' >
                    <div className='bg-slate-900 flex gap-3 text-2xl p-2 rounded-md transition-all duration-75 hover:scale-90'>
                      <BsGithub className='my-auto' />
                      <h2>GitHub</h2>
                    </div>
                  </a>
                }

                {
                userData?.linkedIn &&
                  <a href={userData?.linkedIn} target='_linkedIn'>
                    <div className='bg-slate-900 flex gap-3 text-2xl p-2 rounded-md transition-all duration-75 hover:scale-90'>
                      <BsLinkedin className='my-auto' />
                      <h2 className='w-[7rem]'>Linked In</h2>
                    </div>
                  </a>
                }

                {
                userData?.twitter &&
                <a href={userData?.twitter} target='_twitter'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 rounded-md transition-all duration-75 hover:scale-90'>
                    <FaTwitter className='my-auto' />
                    <h2>Twitter</h2>
                  </div>
                </a>
                }

                <a href={`mailto:${userData?.email}`} target='_email'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 rounded-md transition-all duration-75 hover:scale-90'>
                    <HiMail className='my-auto ' />
                    <h2>Email</h2>
                  </div>
                </a>

                {
                userData?.resume &&
                <a href={userData?.resume} target='_resume'>
                  <div className='bg-slate-900 flex gap-3 text-2xl p-2 rounded-md transition-all duration-75 hover:scale-90'>
                    <FaFilePdf className='my-auto' />
                    <h2>Resume</h2>
                  </div>
                </a>
                }


              </div>
            </div>
          </div>

          {
            ownerId === userID ?   <button 
                                      onClick={()=>setOpen(true)}
                                      className='flex gap-3 bg-green-parrot h-fit p-2 px-4 rounded-md absolute top-0 right-0 text-lg font-bold text-slate-300 transition-all duration-150 hover:scale-90'>
                                    <FiEdit className='mt-[2px]' />
                                    <h2 className='hidden lg:block'>UPDATE</h2>
                                  </button> : <></>
          }


        </div>
      </div>
      <div className='background-light-dark-green w-full min-h-[40rem]'>
          <h2 className='text-center text-xl lg:text-3xl py-5 font-semibold text-slate-300'><u>Joined Contest : {userData?.joinedContest?.length}</u></h2>

          <div className='w-screen lg:w-[80%] m-auto grid grid-cols-1 lg:grid-cols-3'>
            {userData?.joinedContest?.map((elm, i)=>{
              return(
                <ChallengeCard 
                  key={elm.contest._id}
                  id={elm.contest._id}
                  name={elm.contest.name} 
                  imageURL={elm.contest.imageURL}
                  description={elm.contest.description} 
                  startDate={elm.contest.startDate}
                  endDate={elm.contest.endDate}
                  level={elm.contest.level}
                  // elm={elm}
                />
              )
            })}
          </div>
      </div>
    </div>
  );
};

export default UserProfile;
