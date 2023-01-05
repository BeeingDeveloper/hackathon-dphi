import React from 'react'
import LOGO from '../assets/images/icons/logo-dphi.png'
import {Link} from 'react-router-dom'

const Navbar = () => {

  // const bgcolor = ()=>{
  //   console.log(window.scrollY)
  // } 

  // window.addEventListener('scroll', bgcolor)

  return (
    <nav className='w-screen h-16 bg-slate-500 z-50'>
        <div className=' h-16 fixed bg-white w-screen justify-between items-center'>
            <Link to='/'>
              <img src={LOGO} alt='logo' className='pt-3 pl-28 transition-all ease-in duration-200 hover:scale-[0.90]' /> 
            </Link>
        </div>
    </nav>
  )
}

export default Navbar