import React, { useContext, useEffect, useState } from 'react'
import {RiSearchLine} from 'react-icons/ri'
import { fetchHackathons, filterByLevel } from '../api/api'
import { actionType } from '../context/reducer'
import { StateContext } from '../context/StateProvider'
import ChallengeCard from './ChallengeCard'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByActive } from '../api/api'
import { filterByPassed } from '../api/api'
import { filterByUpcoming } from '../api/api'

const ContestList = () => {

    const {state, dispatch} = useContext(StateContext);
    const {hackathons} = state;
    const [contestList, setContestList] = useState(null);

        //  FETCH ALL HACATHONS
        const fetchAllHackathons=()=>{
            fetchHackathons().then((res)=>{
                setContestList(res.data)
            }).catch(err=> console.log(err));
        }
    
    
    
    
        // FILTER ITEMS BY ACTIVE STATUS
        // const filterByActiveFun =()=>{
        //     hackathons.map(elm=>console.log( new Date(elm.startDate), elm.startDate))
        //     setContestList(hackathons?.filter((elm)=>{
        //         return new Date(elm.startDate) > new Date();
        //     }))
        // }
        const filterByActiveFun = ()=>{
            filterByActive().then((res)=>{
                setContestList(res.data)
            }).catch(err=>console.log(err))
        }
    
    


    // HANDLING SELECT============================================================================
    const [selected, setSelected] = useState('');
    const [searchValue, setSearchValue] = useState('');


    const searchItems = ()=>{
        setContestList(contestList.filter((elm) => {
            let getName = elm.name.toLowerCase().includes(searchValue);
            return getName;
        }))
    }


    const handleSearchItem = (e)=>{
        setSearchValue(e.target.value);
        searchItems();
        if(searchValue.length <= 1){
            fetchAllHackathons()
        }
    }
    // ==========================================================================================



    //  FILTER ITEMS=============================================================================
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    if(selected === "active"){
        filterByActive().then((res)=>{
            console.log(res);
        });
    }
    if(selected === "upcoming"){
        filterByUpcoming().then((res)=>{
            console.log(res);
        });
    }
    if(selected === "past"){
        filterByPassed().then((res)=>{
            console.log(res);
        });
    }
    if(selected === "easy"){
        filterByLevel("Level 1").then((res)=>{
            console.log(res);
        })
    }
    if(selected === "medium"){
        filterByLevel("Level 2").then((res)=>{
            console.log(res);
        })
    }
    //============================================================================================


    useEffect(() => {
        fetchAllHackathons();
    }, []);
    

    
  return (
    <div className='h-auto lg:h-screen w-screen pb-44 m-auto'>
        <div className='w-full background-dark'>
            <div className='w-[95%] lg:w-[80%] m-auto py-20 flex flex-col'>
                <h2 className='w-fit m-auto text-2xl font-semibold my-10'>Explore Challenges</h2>
                <div className=' w-full lg:w-[75%] m-auto flex gap-5  justify-between text-black pb-10'>
                    <div className='flex bg-white rounded-md w-full py-2 h-10'>
                        <RiSearchLine className='my-auto text-2xl ml-5' />
                        <input 
                            className='bg-white rounded-md w-full outline-none ml-2'
                            value={searchValue}
                            onChange={handleSearchItem}
                         />
                    </div>
                    <div className='flex flex-col w-40'>
                        <FormControl sx={{ minWidth: 170, background: 'white', borderRadius: '0.25rem', }} size="small">
                          <InputLabel id="demo-select-small">Filter</InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={selected}
                            onChange={handleChange}
                          > 
                            <h5 className='font-semibold ml-1'>Status</h5>
                            <hr />
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'active'} >Active</MenuItem>
                                <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                                <MenuItem value={'past'}>Past</MenuItem>
                            <h5 className='font-semibold ml-1'>Level</h5>
                            <hr />
                                <MenuItem value={'easy'}>Easy</MenuItem>
                                <MenuItem value={'medium'}>Medium</MenuItem>
                                <MenuItem value={'hard'}>Hard</MenuItem>
                      </Select>
                      {/* <button onClick={filterByActiveFun} >filter</button> */}
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
                contestList?.map((elm, i)=>{
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