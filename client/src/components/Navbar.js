import React, { useContext } from 'react'
import LOGO from '../assets/images/icons/logo-dphi.png'
import {Link} from 'react-router-dom'
import '../utils/style.css'
import { StateContext } from '../context/StateProvider'


const Navbar = () => {

  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const userName = user?.name;

  return (
    <nav className='w-screen h-16 bg-slate-500 z-50'>
        <div className=' h-16 fixed bg-white w-screen flex justify-between '>
          <div className='w-[80%] m-auto flex justify-between'>
              <Link to='/'>
                  <img src={LOGO} alt='logo' className='pt-2 transition-all ease-in duration-200 hover:scale-[0.90]' /> 
              </Link>

              <div>
                {
                  userName ? (
                  <div className='bg-green-parrot rounded-full px-2 transition-all ease-out duration-150 hover:scale-90 h-fit my-3 text-lg font-semibold'>{userName.split(" ")[0]}</div>
                  ) : (
                    <Link to='/signin'>
                      <button className='bg-green-parrot text-lg px-4 py-1 my-3 transition-all ease-in duration-150 hover:scale-75 rounded-full font-semibold text-white '>Sign In</button>
                    </Link>
                  )
                }

              </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar