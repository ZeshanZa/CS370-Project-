"use client"

import React from 'react'
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
    <div>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={inputskills}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="skill" />}
    />
    <FriendComponent name={"Jon"} skills={["Java ", "Python ", "CSS "]} github='github/jon/me.com'/>
    </div>
  )
}

export default page