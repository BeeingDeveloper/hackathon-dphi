import React, {useState} from 'react'
import CALENDER from '../assets/images/icons/uil_calender.svg'
import '../utils/style.css'
import {motion} from 'framer-motion'
import { storage, } from '../config/firebase.config'
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import {MdCloudUpload} from 'react-icons/md'
import {MdDeleteForever} from 'react-icons/md'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';








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



const CreateChallenges = () => {

    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imageUploadingProgress, setImageUploadingProgress] = useState(0);

    const [challengeName, setChallengeName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [level, setLevel] = useState('Level 1');

    // console.log()

    const handleStartDate = (newDate) => {
        setStartDate(newDate);
    };
    const handleEndDate = (newDate) => {
        setEndDate(newDate);
    };

    const createHackathon = ()=>{
        const data = {
            name: challengeName,
            authorID: "dljd",
            imageURL: imageURL,
            description: description,
            startDate: startDate,
            endDate: endDate,
            level: level,  
        }
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DateTimePicker
                          value={startDate}
                          onChange={handleStartDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>



            <div className='flex flex-col gap-5 lg:w-[40%] '>
                <h2 className='text-lg font-semibold'>End Date</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={4}>
                        <DateTimePicker
                          value={endDate}
                          onChange={handleEndDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
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

                <motion.button whileHover={{scale: 0.95}} className='p-3 bg-green-parrot w-fit px-10 text-white rounded-md'>Save Changes</motion.button>
            </div>

        </div>
    </div>
  )
}

export default CreateChallenges