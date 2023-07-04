import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchHackathonByID, participateContest } from '../api/api';
import '../utils/style.css'
import {BsBarChartFill} from 'react-icons/bs';
import UserItem from '../components/UserItem';
import { StateContext } from '../context/StateProvider';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {BiTimeFive} from 'react-icons/bi'

const ContestPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const [hackathonItem, setHackathonItem] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [tab, setTab]= useState(1);
    const [isLoading, setIsLoading] = useState(true); 
    //--------------------------------------------------------------------------------------




    //  HANDLE ACTIVE STATUS------------------------------------------------------------------------------------------------------------------------------
    let isExpired = false;
    if(new Date(hackathonItem?.endDate) < new Date()){
        isExpired = true;
    }

    const {state, setActiveAlert, setAlertMsg, setIsPositive} = useContext(StateContext);
    const userID = state?.user?._id;

    let targetDate = "";
    let options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

    if(new Date(hackathonItem?.startDate) > new Date()){ 
        // YET TO START
        targetDate = `Starts On ${new Date(hackathonItem?.endDate).toDateString()} ${new Date(hackathonItem?.endDate).toLocaleString('en-US', options)}`;
    }else if(new Date(hackathonItem?.startDate) < new Date() && new Date(hackathonItem?.endDate) > new Date()){
        //  WHEN CHALLENGE ACTIVE
        targetDate = `Ends On ${new Date(hackathonItem?.endDate).toDateString()} ${new Date(hackathonItem?.endDate).toLocaleString('en-US', options)}`;
    }else{
        //  WHEN CHALLENGE ENDED
        targetDate = `Ended On ${new Date(hackathonItem?.endDate).toDateString()} ${new Date(hackathonItem?.endDate).toLocaleString('en-US', options)}`;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------





    // FETCH ALL HACKATHONS----------------------------------------------------------------
    const fetchHackathonItem = (id)=>{
        fetchHackathonByID(id).then((res)=>{
            setParticipants(res.data.participants);
            setHackathonItem(res.data);
            setTimeout(()=>{
                setIsLoading(false);            //  WHEN DATA FETCHED
            },2000);
        }).catch(err=>console.log(err))
    }
    //-------------------------------------------------------------------------------------








    // ON CLICK PARTICIAPATE---------------------------------------------------------------
    const participate = (contestID, userID)=>{
        if(!state.user){                // WHEN USER DID NOT SIGNED UP
            navigate('/signin');
            setActiveAlert(true);
            setAlertMsg("Please sign up");
            setIsPositive(false);
            setTimeout(()=>{
                setActiveAlert(false);
                setAlertMsg("");
            },3000);
        }
        else if(isExpired){             // WHEN CONTEST HAS EXPIRED
            setActiveAlert(true);
            setAlertMsg("Contest has expired");
            setIsPositive(false);
            setTimeout(()=>{
                setActiveAlert(false);
                setAlertMsg("");
            },3000);
        }
        else{
            participateContest(contestID, userID).then((res)=>{
                const userResponse = res.user;
                //  WHEN USER ALREADY EXIST AS PARTICIPANTS
                if(userResponse.data.success === false){
                    setActiveAlert(true)          
                    setAlertMsg(userResponse.data.msg);
                    setIsPositive(false);

                    setTimeout(()=>{
                        setActiveAlert(false);
                        setAlertMsg("");    
                    },3000);
                }

                //  WHEN USER DOESNOT EXIST, ADD USER AS PATICIPANTS
                if(userResponse.data.success === true){
                    setActiveAlert(true)          
                    setAlertMsg(userResponse.data.msg);
                    setIsPositive(true);

                    setTimeout(()=>{
                        setActiveAlert(false);
                        setAlertMsg("");    
                    },3000);
                }
            }).catch(err=>console.log(err));
        }
    }
    //-------------------------------------------------------------------------------------








    useEffect(()=>{
        document.title = "Contest | Ai-Planet"
        fetchHackathonItem(id);
    },[tab]);

    return (
        <div className=''>
            <div className='h-auto  w-screen background-dark-green '>
                <div className='flex flex-col gap-10 w-screen lg:w-[75%] m-auto p-10 lg:p-20'>

                    <h2 className='text-lg text-slate-200 font-semibold status-upcoming w-fit px-5 rounded-md'>
                        <BiTimeFive className='inline text-2xl m-2' />{targetDate}</h2>
                    <h2 className='text-4xl text-white font-semibold'>{hackathonItem?.name}</h2>
                    <h2 className='text-slate-300'>{hackathonItem?.description}</h2>

                    <div className='bg-white p-2 flex gap-3 w-fit px-8 rounded-md font-bold'>
                        <BsBarChartFill className='my-1' />
                        <h2>{hackathonItem?.level === "Level 1" ? "Easy" : hackathonItem?.level === "Level 2" ? "Medium" : "Hard"}</h2>
                    </div>

                    <button className=' text-left bg-green-parrot w-fit p-2 rounded-md text-slate-200 px-4 font-semibold transition-all duration-90 hover:scale-90' 
                    onClick={()=>participate(id, userID)}>
                        PARTICIPATE
                    </button>
                </div>
            </div>

            <div className='h-16 w-screen bg-white shadow-xl shadow-slate-400'> 
                <div className='w-[75%] m-auto flex justify-between'>
                    <div className='flex w-fit gap-5 relative top-5 cursor-pointer'>
                        <div className='flex flex-col' onClick={()=>setTab(1)} >
                            <h2 className='font-semibold text-lg lg:text-2xl w-fit m-auto'>Overview</h2>
                            <div className={` transition-all duration-150 top-10 h-[7px] bg-green-parrot absolute ${tab == 1 ? 'left-0 w-24 lg:w-32' : 'left-[6rem] lg:left-[8rem] w-[10rem] lg:w-[12rem]'}`}></div>
                        </div>
                        <h2
                            onClick={()=>setTab(2)} 
                            className='font-semibold text-lg lg:text-2xl w-fit m-auto '>Participant List</h2>

                    </div>

                </div>
            </div>

            {
                tab == 1 ? (
                    <div className='w-[75%] m-auto mt-10'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        
                    </div>
                ) : 
                    isLoading ? 
                        <div className='w-fit m-auto mt-10'>
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                <CircularProgress color="success" />
                            </Stack>
                        </div>

                    :   participants.length >0 ?               
                        <div className='w-[95%] lg:w-[75%] m-auto my-10 shadow-lg shadow-slate-400'>
                            <div className='flex w-full justify-between bg-green-parrot p-2 text-xl font-semibold text-slate-100 rounded-t-md text-center'>
                                <h1 className='w-[33.3%] text-sm lg:text-xl'>Name</h1>
                                <h1 className='w-[33.3%] text-sm lg:text-xl'>Email</h1>
                                <h1 className='w-[33.3%] text-sm lg:text-xl'>Date of Join</h1>
                            </div>
                            {
                                participants?.map((elm) => (
                                    <UserItem
                                    key={elm.id}
                                    userID={elm.user._id}
                                    name={elm.user.name}
                                    email={elm.user.email}
                                    date={elm.dateJoined}
                                    profilePic={elm.user.imageURL}
                                    />
                                ))
                                }
                            </div> 
                        : <h2 className='text-center text-2xl font-semibold pt-10'>NO PARICIPANTS</h2>
                        
            }
        </div>
  )
}

export default ContestPage
