import React, { useContext, useEffect } from 'react'
import '../utils/style.css'
import {FcGoogle} from 'react-icons/fc'
import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { createNewUser, validateUser } from '../api/api'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { firebaseApp} from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'

const SignIn = ({setAuth}) => {

    //ESSENTIALS----------------------------------------
    const { dispatch} = useContext(StateContext);
    const navigate = useNavigate();
    //--------------------------------------------------




    // INGREDIENTS----------------------------------
    const authProvider = new GoogleAuthProvider();
    const firebaseAuth = getAuth(firebaseApp);
    //----------------------------------------------





    // SIGN IN WITH GOOGLE-------------------------------------------------------------------
        const signInWithGoogle = async()=>{
            await signInWithPopup(firebaseAuth, authProvider).then((userInfo)=>{
                if(userInfo){
                    setAuth(true);
                    window.localStorage.setItem('auth', 'true');

                    firebaseAuth.onAuthStateChanged((userCred)=>{
                        if(userCred){
                            userCred.getIdToken().then((token)=>{
                                validateUser(token).then((data)=>{
                                    dispatch({type: actionType.SET_USER, user: data})
                                    navigate('/');
                                })
                            });
                        }
                    })
                }
            });
        }
    //--------------------------------------------------------------------------------------




    useEffect(()=>{
        document.title = "Sign In | Ai Planet"

        if(window.localStorage.getItem('auth') === 'true'){
            navigate('/')
        }
    },[])


  return (
    <div className='h-screen w-screen h-screen-minus-nav flex justify-center items-center'>
        <div>
            <button 
                onClick={()=>signInWithGoogle()}
                className='flex items-center justify-center gap-2 bg-slate-600 rounded-md hover:rounded-3xl bgs hover:bg-card p-2 transition-all ease-in-out duration-600 font-semibold text-slate-300 cursor-pointer'>
                <FcGoogle className='my-auto text-3xl' />
                <h2>Sign In with google</h2>
            </button>
        </div>
    </div>
  )
}

export default SignIn;