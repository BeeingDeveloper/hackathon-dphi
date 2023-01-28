import React, {useContext, useState} from 'react'
import CALENDER from '../assets/images/icons/uil_calender.svg'
import '../utils/style.css'
import {motion} from 'framer-motion'
import { storage, } from '../config/firebase.config'
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import {MdCloudUpload} from 'react-icons/md'
import {MdDeleteForever} from 'react-icons/md'

import { createNewHackathon, fetchHackathons } from '../api/api'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import DatePicker from 'react-date-picker';



const UploadingUI = ({imageUploadingProgress})=>{

    return(
        <div className='h-full w-full flex justify-center items-center' >
            <div className='h-[15rem] w-full rounded-md flex justify-center items-center bg-slate-300'>
                <div className='p-5 w-full text-center'>
                    <div className={`h-5 w-full border border-green-600 rounded-full`}>
                        <div className='h-full bg-green-parrot rounded-full' style={{width: `${imageUploadingProgress}%`}} ></div>
                    </div>
                    <h2 className='pt-2 font-semibold text-lg text-green-parrot'>{`Uploading: ${imageUploadingProgress}%`}</h2>
                </div>
            </div>
        </div>
    )
}











const ImageInput = ({imageURL,setImageURL, setIsImageLoading, setImageUploadingProgress})=>{

    const uploadFile =(e)=>{

        setIsImageLoading(true)

        const uploadItem = e.target.files[0];
        const storageRef = ref(storage, `/Images/${Date.now()}-${uploadItem.name}`);
        const uploadTask = uploadBytesResumable(storageRef, uploadItem);

        uploadTask.on("state_changed", (snapshot)=>{
            setImageUploadingProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100 ));
        },
        (err)=>{
            console.log(err)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((imageURL)=>{
                setImageURL(imageURL);
                setIsImageLoading(false)
            })
        }
        )
    }


    const deleteIMG=(image)=>{
        const deleteRef = ref(storage, image);
        deleteObject(deleteRef).then(()=>{
            setImageURL(null);
        })
    }


    return (
        <div className='flex flex-col h-full w-full '>
            <h3 className='font-semibold text-lg pb-2'>Image</h3>
            {!imageURL ? (
                <label>
                    <div  className='flex flex-col  cursor-pointer h-44 w-full p-5 bg-slate-200 transition-all ease-in-out duration-150 hover:bg-slate-300 rounded-md'>
                        <div className='h-full w-full flex justify-center items-center rounded-xl'>
                            <MdCloudUpload className='text-[3.5rem] text-green-parrot transition-all ease-in-out duration-150 hover:scale-75' />
                        </div>
                    </div>

                    <input
                        type='file'
                        name='upload-file'
                        accept="image/*"
                        className='w-0 h-0'
                        onChange={uploadFile}
                    />

                </label>
            ) : (
                <div className='w-full h-full bg-green-parrot rounded-md'>
                    <img src={imageURL} className='h-full w-full rounded-xl p-1' />
                    <motion.div whileHover={{scale: 1.1}} className='relative bottom-12 w-fit p-1 text-3xl rounded-full left-[1rem] bg-red-600'>
                      <MdDeleteForever onClick={()=>deleteIMG(imageURL)} />
                    </motion.div>
                </div>
            )}

        </div>
    )
}
















//========================  STARING COMOPOENT========================================

const CreateChallenges = () => {

    const {state, dispatch} = useContext(StateContext);
    const {hackathons, user} = state
    
    const userID = user?.user_id;

    //CONVERT TIME TO MONGODB------------------------------------------------------------------
    const convertDefaultDate = (systemDate)=>{
        const localDate = systemDate.toLocaleDateString();
        const localTime = systemDate.toTimeString();
        let getDay = localDate.split('/')[1];
        let getMonth =  localDate.split('/')[0];
        let getYear = systemDate.getFullYear();

        getDay = getDay < 10 ? `0${getDay}` : getDay;
        getMonth = getMonth < 10 ? `0${getMonth}` : getMonth;

        const finalTime = `${getYear}-${getMonth}-${getDay}T${localTime.slice(0,8)}.000+00:00`
        return finalTime;
    }
    //-----------------------------------------------------------------------------------------







    //STATE VALUE------------------------------------------------------------
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imageUploadingProgress, setImageUploadingProgress] = useState(0);

    const [challengeName, setChallengeName] = useState('');
    const [startDate, setStartDate] = useState(convertDefaultDate(new Date));
    const [endDate, setEndDate] = useState(convertDefaultDate(new Date));
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [level, setLevel] = useState('Level 1');

    //-----------------------------------------------------------------------







    //CONVERT TIME TO MONGODB------------------------------------------------
    const convertTimeToMongoDB =(localTime)=>{
        const getDate = localTime;
        const year = getDate.slice(0,10);
        const time = getDate.slice(11, 16);
        const newTime = `${year}T${time}:00.000+00:00`
        return newTime;
    }
    //-----------------------------------------------------------------------




    //HANDLE START DATE------------------------------------------------------
    const handleStartDate = (e) => {
        setStartDate(convertTimeToMongoDB(e.target.value)); 
    };
    //-----------------------------------------------------------------------



    //END DATE---------------------------------------------------------------
    const handleEndDate = (e) => {
        setEndDate(convertTimeToMongoDB(e.target.value));
    };
    //-----------------------------------------------------------------------



    // API FUNCTION FOR NEW HACKATHON
    const createHackathon = ()=>{
        const newHackathon = {
            name: challengeName,
            authorID: userID,
            imageURL: imageURL,
            description: description,
            startDate: startDate,
            endDate: endDate,
            level: level,  
        }

        createNewHackathon(newHackathon).then((res)=>{
            dispatch({type: actionType.SET_HACKTHONS, hackathons: res.data});
        });

    }

  return (
    <div className='h-auto lg:h-screen w-screen'>
        <div className='w-full h-20 bg-slate-200'>
            <div className='w-[95%] lg:w-[80%] m-auto'>
                <h2 className='text-2xl font-semibold pt-5'>Challenges Details</h2>
            </div>
        </div>

        <div className=' w-[80%] py-10 m-auto flex flex-col gap-10 '>
            <div className='flex flex-col gap-5 lg:w-[40%]'>
                <h2 className='text-lg font-semibold'>Challenge Name</h2>
                <input 
                    placeholder='enter challenge name...' 
                    className=' p-2 border border-slate-400 outline-none rounded-md'
                    value={challengeName}
                    onChange={(e)=>setChallengeName(e.target.value)}
                    />
            </div>







            <div className='flex flex-col gap-5 lg:w-[40%] '>
                <h2 className='text-lg font-semibold'>Start Date</h2>
                <div className='flex justify-between border-2 border-slate-400 rounded-md p-1'>
                    <input 
                        value={startDate}
                        placeholder='enter date'
                        className='outline-none w-[90%]'
                        disabled={true}
                    />
                    
                    <input
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue={new Date()}
                      placeholder=''
                    //   value={startDate}
                      onChange={handleStartDate}
                      className='w-[1.2rem] h-[2rem] bg-slate-300 rounded-md m-1 outline-none cursor-pointer'
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                </div>
            </div>



            <div className='flex flex-col gap-5 lg:w-[40%] '>
                <h2 className='text-lg font-semibold'>End Date</h2>
                <div className='flex justify-between border-2 border-slate-400 rounded-md p-1'>
                    <input 
                        value={endDate}
                        placeholder='enter date'
                        className='outline-none w-[90%]'
                        disabled={true}
                    />
                    
                    <input
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue={new Date()}
                      placeholder=''
                    //   value={endDate}
                      onChange={handleEndDate}
                      className='w-[1.2rem] h-[2rem] bg-slate-300 rounded-md m-1 outline-none cursor-pointer'
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                </div>
            </div>







            
            <div className='flex flex-col gap-5 w-[67%] lg:w-[40%] '>
                <h2 className='text-lg font-semibold'>Description</h2>
                <textarea 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    type='text' 
                    placeholder='enter description...' 
                    className='border border-slate-400 rounded-md p-2 w-[150%] outline-none' />
            </div>

            <div className='flex flex-col h-full lg:w-[40%]'>
                {isImageLoading ? 
                <UploadingUI 
                    imageUploadingProgress={imageUploadingProgress} 
                    /> 
                    : 
                    <ImageInput 
                        imageURL={imageURL} 
                        setImageURL={setImageURL} 
                        setIsImageLoading={setIsImageLoading}
                        setImageUploadingProgress={setImageUploadingProgress}
                    /> 
                }
            </div>


            <div className='flex flex-col gap-5 lg:w-[40%] '>
                <select 
                    className='border border-slate-400 p-2 rounded-md w-[15rem] outline-none my-5'
                    onChange={(e)=>setLevel(e.target.value)}
                    >
                    <option  value='Level 1'>Level 1</option>
                    <option value='Level 2'>Level 2</option>
                    <option value='Level 3'>Level 3</option>
                </select>

                <motion.button 
                    whileHover={{scale: 0.95}} 
                    className='p-3 bg-green-parrot w-fit px-10 text-white rounded-md'
                    onClick={createHackathon}
                >Create Challenge</motion.button>
            </div>

        </div>
    </div>
  )
}

export default CreateChallenges