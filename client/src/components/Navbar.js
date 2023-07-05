import React, { useContext, useEffect, useState } from 'react'
import LOGO from '../assets/images/icons/logo-dphi.png'
import {Link, useNavigate} from 'react-router-dom'
import '../utils/style.css'
import { StateContext } from '../context/StateProvider'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  Button,
} from '@chakra-ui/react'
import {motion} from 'framer-motion';
import {getAuth} from 'firebase/auth'
import {firebaseApp} from '../config/firebase.config'
import { actionType } from '../context/reducer'


const Navbar = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const userName = user?.name;
  const profilePic = user?.imageURL;

  const signOut = ()=>{
    const auth = getAuth(firebaseApp);
    auth.signOut().then(()=>{
      window.localStorage.setItem("auth", "false");
      dispatch({type: actionType.SET_USER, user: null});
      navigate('/signin');
    }).catch((err)=>{
      console.log(err);
    })
  }

  const [profilePicUrl, setProfilePicUrl] = useState('');

  const fetchProfilePic = async () => {
    try {
      const response = await fetch(profilePic);
      if (response.ok) {
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setProfilePicUrl(imgUrl);
      } else {
        console.error('Failed to fetch profile picture');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };
  useEffect(() => {
    if (profilePic) {
      fetchProfilePic();
    }
  }, [profilePic]);

  return (
    <nav className='w-screen h-16 bg-slate-500 z-50 relative'>
        <div className=' h-16 fixed bg-white w-screen flex justify-between '>
          <div className='w-[80%] m-auto flex justify-between'>
              <Link to='/'>
                  <img src={LOGO} alt='logo' className='pt-2 h-10 md:h-14 transition-all ease-in duration-200 hover:scale-[0.90]' /> 
              </Link>

              <div>

                
                <Popover
                  isOpen={!userName ? false : undefined }
                  closeOnBlur={true}
                  >
                  <PopoverTrigger>
                    <Button>
                        <div>
                          {
                            userName ? (
                              <div className='flex justify-center items-center bg-green-parrot rounded-full px-2 transition-all ease-out duration-150 hover:scale-90 h-fit my-3 text-lg font-semibold p-1 gap-1'>
                                {profilePicUrl && <img src={profilePicUrl} className='w-4 h-4 md:h-8 md:w-8 rounded-full' />}
                                <h2 className='text-sm md:text-lg text-slate-200 font-semibold pr-1'>{userName.split(" ")[0]}</h2>
                              </div>
                            ) : (
                              <Link to='/signin'>
                                <button className='bg-green-parrot text-lg px-4 py-1 my-3 transition-all ease-in duration-150 hover:scale-75 rounded-full font-semibold text-white '>
                                  Sign In
                                  </button>
                              </Link>
                            )
                          }
                        </div>
                    </Button>
                  </PopoverTrigger>

                  <Portal>
                    <PopoverContent className='bg-green-parrot w-44 text-slate-200 font-semibold shadow-2xl shadow-red-500 rounded-lg p-2'>
                      <div className='flex flex-col gap-2'>
                          <motion.p 
                            className=' cursor-pointer' 
                            whileHover={{scale: 0.95}}
                            onClick={signOut}
                          >Sign Out</motion.p>

                          {user?._id && 
                            <Link to={`/user-profile/${user?._id}`} className='hover:scale-90 transition-all duration-150'>
                              Profile
                            </Link>
                          }
                          {user?.role === 'admin' && (<Link to='/dashboard'>Dashboard</Link>)}
                      </div>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar