"use client"

import React, { useEffect, useState } from 'react'
import SignInPageComponent2 from "../components/SignInPageComponent2"
import MainPageComponent2 from "../components/MainPageComponent2"
import MatchesPageComponent from "../components/MatchesPageComponent"
import SignInPageComponent from "../components/SignInPageComponent"
import MainPageComponent from "../components/MainPageComponent"
import ChangePasswordComponent from "../components/ChangePasswordComponent"
import UpdateProfilePageComponent from "../components/UpdateProfilePageComponent"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FriendComponent from "../components/FriendComponent"

import data from './languages_data.json' assert { type: 'json' };

function page() {
  const [skillsLooking, setSkillsLooking] = useState([])
  const [skillsHave, setSkillsHave] = useState([])

  const [addLooking, setAddLooking] = useState('')
  const [addHave, setAddHave] = useState('')

  useEffect(() => {
    setSkillsLooking(['Java', 'Python', 'CSS'])
    setSkillsHave(['OCaml', 'R', 'HTML'])
  }, [])
  
  //console.log(data);
  function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key].title);
    });
    return result;
  }
  const inputskills = json2array(data)
  
  return (
    <div className='w-full h-[100dvh] items-center flex justify-center flex-col'>
      <div className='bg-slate-200 rounded-md shadow-md p-5 flex flex-row'>
        <div className='w-96 border-r-2 border-black items-center'>
          <div className='relative my-2'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={inputskills}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="skill I have" />}
              inputValue={addHave}
              onInputChange={(event, newInputValue) => {
                setAddHave(newInputValue);
              }}
            />
          </div>
          <div className='flex flex-col'>
            <text className='my-3'> Skill to add: <span className='font-bold'>{addHave}</span> </text>
            <button className='bg-blue-600 rounded-md p-2 text-white hover:bg-blue-800 w-max' onClick={() => location.reload()}> Add skill </button>
          </div>
        </div>
        <div className='w-96 border-l-2 border-black items-center pl-20'>
          <div className='relative my-2'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={inputskills}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="skill I want" />}
              inputValue={addLooking}
              onInputChange={(event, newInputValue) => {
                setAddLooking(newInputValue);
              }}
            />
          </div>
          <div className='flex flex-col'>
            <text className='my-3'> Skill to add: <span className='font-bold'>{addLooking}</span> </text>
            <button className='bg-blue-600 rounded-md p-2 text-white hover:bg-blue-800 w-max' onClick={() => location.reload()}> Add skill </button>
          </div>
        </div>
      </div>
      <div className='mt-10 bg-slate-200 rounded-md shadow-md p-4 flex flex-col'>
        <text> Skills I have: <span className='font-bold'>{skillsHave.join(", ")}</span></text>
        <text className='pt-1 mt-1 border-t-[1px] border-black'> Skills I am looking for: <span className='font-bold'>{skillsLooking.join(", ")}</span></text>
      </div>
    {/* <FriendComponent name={"Jon"} skills={["Java ", "Python ", "CSS "]} github='github/jon/me.com'/> */}
    </div>
  )
}

export default page