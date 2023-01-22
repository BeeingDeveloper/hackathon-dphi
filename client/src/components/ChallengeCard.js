import React from 'react'
import THUMBNAIL from '../assets/images/cardimage/Group 1000002466.png'



const ChallengeCard = ({}) => {
  return (
    <div className='w-[354px] text-center bg-white text-black font-semibold rounded-2xl m-auto my-5'>
    <img src={THUMBNAIL} className='w-[354px] h-[174px]' />
        <div className='p-5'>
            <h3 className='text-xl h-20 '>data.name</h3>
            <h5 className='text-md h-20   font-semibold'>Starts In</h5>
            <h3 className='text-xl h-20 '>data.dat</h3>
        </div>
    </div>
  )
}

export default ChallengeCard