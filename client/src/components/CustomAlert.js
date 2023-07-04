import React, { useContext,  } from 'react'
import { BsFillEmojiFrownFill, BsFillEmojiSmileFill} from 'react-icons/bs'
import '../utils/style.css'
import { StateContext } from '../context/StateProvider'

const CustomAlert = () => {

    const {activeAlert, alertMsg, isPositive} = useContext(StateContext)


    return (
    <div className='flex  overflow-visible h-16 w-screen absolute top-20 '>

        <div className={`flex overflow-hidden bg-white w-[25rem] transition-all duration-100 shadow-xl ${isPositive ? 'shadow-green-700' : 'shadow-red-700'} m-auto ${activeAlert? 'h-12' : 'h-0'} rounded-md`}>
            <div className={`w-2 h-full bg-green-500 rounded-l-md ${isPositive? 'bg-green-500' : 'bg-red-600'}`}>
            </div>
            <div className='flex'>
                <h2 className={`text-2xl my-auto px-4 ${isPositive? 'text-green-500' : 'text-red-600'}`}>{isPositive ? <BsFillEmojiSmileFill /> :<BsFillEmojiFrownFill /> }</h2>
                <h2 className='text-slate-900 my-auto font-semibold text-center'>{alertMsg}</h2>
            </div>
        </div>
    </div>
  )
}

export default CustomAlert