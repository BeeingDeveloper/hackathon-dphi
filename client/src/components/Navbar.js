import React, { useContext } from 'react'
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
  Text
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

  



  return (
    <nav className='w-screen h-16 bg-slate-500 z-50'>
        <div className=' h-16 fixed bg-white w-screen flex justify-between '>
          <div className='w-[80%] m-auto flex justify-between'>
              <Link to='/'>
                  <img src={LOGO} alt='logo' className='pt-2 transition-all ease-in duration-200 hover:scale-[0.90]' /> 
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
                                <img src={profilePic ? profilePic : null} className='w-8 h-8 rounded-full' />
                                <h2>{userName.split(" ")[0]}</h2>
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
                  <Portal  >
                    <PopoverContent className='bg-green-parrot w-44 text-slate-200 font-semibold shadow-2xl shadow-red-500 rounded-lg p-2'>
                      <div className='flex flex-col gap-2'>
                          <motion.p 
                            className=' cursor-pointer' 
                            whileHover={{scale: 0.95}}
                            onClick={signOut}
                          >Sign Out</motion.p>
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