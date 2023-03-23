import React, { useContext, useEffect, useState } from 'react'
import {RiSearchLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fetchHackathons } from '../api/api'
import { actionType } from '../context/reducer'
import { StateContext } from '../context/StateProvider'
import ChallengeCard from './ChallengeCard'
import {RiArrowDropDownLine} from 'react-icons/ri'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ContestList = () => {

    const {state, dispatch} = useContext(StateContext);
    const {hackathons} = state;

    const [filterMenu, setFilterMenu] = useState(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    
    console.log(age)


    useEffect(() => {
        fetchHackathons().then((res)=>{
            dispatch({type: actionType.SET_HACKTHONS, hackathons: res.data});
        })
    }, [])
    
    
    // console.log(hackathons)

  return (
    <div className='h-auto lg:h-screen w-screen '>
        <div className='w-full background-dark'>
            <div className='w-[95%] lg:w-[80%] m-auto py-20 flex flex-col'>
                <h2 className='w-fit m-auto text-2xl font-semibold my-10'>Explore Challenges</h2>
                <div className=' w-full lg:w-[75%] m-auto flex gap-5  justify-between text-black pb-10'>
                    <div className='flex bg-white rounded-md w-full py-2 h-10'>
                        <RiSearchLine className='my-auto text-2xl ml-5' />
                        <input className='bg-white rounded-md w-full outline-none ml-2' />
                    </div>
                    <div className='flex flex-col w-40'>
                        <FormControl sx={{ minWidth: 120, background: 'white', borderRadius: '0.25rem', }} size="small">
                          <InputLabel id="demo-select-small">Filter</InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          > 
                            <h5 className='font-semibold'>Status</h5>
                            <hr />
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'active'}>Active</MenuItem>
                                <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                                <MenuItem value={'past'}>Past</MenuItem>
                            <h5 className='font-semibold'>Level</h5>
                            <hr />
                                <MenuItem value={'easy'}>Easy</MenuItem>
                                <MenuItem value={'medium'}>Medium</MenuItem>
                                <MenuItem value={'hard'}>Hard</MenuItem>
                      </Select>
                    </FormControl>
                    </div>
                </div>
                <div className=''>
                    <div className='flex flex-col'>

                    </div>
                </div>
            </div>

            <div className='w-[95%] lg:w-[80%] m-auto  flex flex-col'>

            </div>
        </div>
        <div className='w-[95%] lg:w-[85%] m-auto h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20'>
            {
                hackathons?.map((elm, i)=>{
                    return (
                            <ChallengeCard 
                                key={i}
                                id={elm._id}
                                name={elm.name} 
                                imageURL={elm.imageURL}
                                description={elm.description} 
                                startDate={elm.startDate}
                                endDate={elm.endDate}
                                level={elm.level}
                                // elm={elm}
                                />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ContestList