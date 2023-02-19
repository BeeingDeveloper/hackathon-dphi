import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import '../utils/style.css'
import DashboardHackathons from './DashboardHackathons'
import DashboardHome from './DashboardHome'
import DashboardUser from './DashboardUser'

const AdminPanel = () => {
  return (
    <div className=' background-light-dark-green items-center min-h-screen'>
        <div className='w-screen background-dark-green h-64 flex justify-center items-center'>
            <div className='w-[70%] m-auto flex gap-5 text-xl text-slate-300 justify-center items-center background-light-dark-green p-3 border border-parrot rounded-full'>
                <NavLink to='/dashboard/home' className='transition-all duration-150 ease-in hover:scale-90' >Home</NavLink>
                <NavLink to='/dashboard/users' className='transition-all duration-150 ease-in hover:scale-90' >Users</NavLink>
                <NavLink to='/dashboard/hackathons' className='transition-all duration-150 ease-in hover:scale-90' >Hackathons</NavLink>
            </div>
        </div>



        <div className='w-[85%] m-auto p-10 text-slate-200'>
            <Routes>
                <Route path='/home' element={<DashboardHome/> } />
                <Route path='/users' element={<DashboardUser /> } />
                <Route path='/hackathons' element={<DashboardHackathons /> } />
            </Routes>
        </div>
    </div>
  )
}

export default AdminPanel

