import React from 'react'
import Challenges from '../components/Challenges'
import ContestList from '../components/ContestList'
import Intro from '../components/Intro'
import '../utils/style.css'


const Home = () => {
  return (
    <div className='h-screen-minus-nav w-screen'>
      <div className='h-full w-full m-auto text-white overflow-scroll'>
        <Intro />
        <Challenges />
        <ContestList />
      </div>
    </div>
  )
}

export default Home