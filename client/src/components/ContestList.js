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

    const { state, dispatch } = useContext(StateContext);
    const { hackathons } = state;
    const [contestList, setContestList] = useState(null);
    const [selected, setSelected] = useState('');
    const [searchValue, setSearchValue] = useState('');
  
    // Fetch all hackathons
    const fetchAllHackathons = () => {
      fetchHackathons()
        .then((res) => {
          setContestList(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    // Filter items by active status
    const filterByActiveFun = () => {
      filterByActive()
        .then((res) => {
          setContestList(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    // Search items
    const searchItems = () => {
      setContestList(
        contestList.filter((elm) => {
          let getName = elm.name.toLowerCase().includes(searchValue);
          return getName;
        })
      );
    };
  
    // Handle search input change
    const handleSearchItem = (e) => {
      setSearchValue(e.target.value);
      searchItems();
      if (searchValue.length <= 1) {
        fetchAllHackathons();
      }
    };
  
    // Handle filter select change
    const handleChange = (event) => {
      setSelected(event.target.value);
    };
  
    // Apply the selected filter
    useEffect(() => {
      if (selected === 'all') {
        fetchAllHackathons();
      } else if (selected === 'active') {
        filterByActiveFun();
      } else if (selected === 'upcoming') {
        filterByUpcoming()
          .then((res) => {
            setContestList(res.data);
          })
          .catch((err) => console.log(err));
      } else if (selected === 'past') {
        filterByPassed()
          .then((res) => {
            setContestList(res.data);
          })
          .catch((err) => console.log(err));
      } else if (selected === 'easy') {
        filterByLevel('Level 1')
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else if (selected === 'medium') {
        filterByLevel('Level 2')
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    }, [selected]);
  
    useEffect(() => {
      fetchAllHackathons();
    }, []);
    
  return (
    <div className="h-auto lg:h-screen w-screen pb-44 m-auto">
    <div className="w-full background-dark">
      <div className="w-[95%] lg:w-[80%] m-auto py-20 flex flex-col">
        <h2 className="w-fit m-auto text-2xl font-semibold my-10">Explore Challenges</h2>
        <div className="w-full lg:w-[75%] m-auto flex flex-col md:flex-row gap-5 justify-between text-black pb-10">
          <div className="flex bg-white rounded-md w-full py-2 h-10">
            <RiSearchLine className="my-auto text-2xl ml-5" />
            <input
              className="bg-white rounded-md w-full outline-none ml-2"
              value={searchValue}
              onChange={handleSearchItem}
            />
          </div>
          <div className="flex flex-col w-40">
            <FormControl sx={{ minWidth:{xs: '95vw', md: 170}, margin:{xs:'auto', md: '0'}, background: 'white', borderRadius: '0.25rem', display: 'flex', }} size="small">
              <InputLabel id="demo-select-small">Filter</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selected}
                onChange={handleChange}
              >
                <h5 className="font-semibold ml-1">Status</h5>
                <hr />
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                  <MenuItem value={'past'}>Past</MenuItem>
                <h5 className="font-semibold ml-1">Level</h5>
                <hr />
                  <MenuItem value={'easy'}>Easy</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'hard'}>Hard</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <div className="flex flex-col">{/* Render filtered contest items here */}</div>
        </div>
      </div>
  
      <div className="w-[95%] lg:w-[80%] m-auto flex flex-col"></div>
    </div>
    <div className="w-[95%] lg:w-[85%] m-auto h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 gap-10">
      {contestList?.map((elm, i) => {
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
        );
      })}
    </div>
  </div>
  )
}

export default ContestList