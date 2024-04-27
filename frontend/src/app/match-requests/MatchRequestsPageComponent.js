"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "./App.css";
import Profile from "./Profile";

const MatchRequestsPageComponent = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([])

  async function getUserSkills(name) {
    const user_id = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user-id/${name}/`);
    //console.log(user_id)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills/${user_id.data}/get-complete-skills/`);
    const { acquired, search } = response.data;
    return [search, acquired]
  }

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token');

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/view-match-requests/`, { // Ensure the endpoint matches your Django URL
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => {
        setMatches(response.data);
        //getUserSkills(response.data[0].sender).then((skills) => console.log(skills))
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Map the matches to the expected structure for the Profile component
  const profiles = matches.map(match => ({
    id: match.sender_id, // Assuming 'sender_id' is the field returned by your API
    name: match.sender, // Assuming 'sender' is the field returned by your API
    skills: ["Python", "Django", "JavaScript"], // Temporary skills, replace with actual data if available
    interests: ["Web Development", "Machine Learning"], // Temporary interests, replace with actual data if available
    imageUrl: "https://via.placeholder.com/150" // Temporary image URL, replace with actual data if available
  }));

  /*async function GetALLSkills() {
    for (let i = 0; i < profiles.length; i++) {
      //console.log(profiles[i].name)
      const skills = await getUserSkills(profiles[i].name)
      profiles[i].skills = skills
      //console.log(skills)
    }
  }
  GetALLSkills();*/

  return (
    /* <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="/mainpage">Home</a></li>
            <li><a href="/startMatching">Start Matching</a></li>
            <li><a href="/matches">Your Matches</a></li>
            <li><a href="/match-requests">Your Requests</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/setpage">Settings</a></li>
          </ul>
        </nav>
      </header>
      <main className="profiles-container">
        {profiles.map(profile => (
          <Profile key={profile.id} profile={profile} />
        ))}
      </main>
    </div> */
    <div className='w-full items-center justify-center flex flex-wrap'>
      {profiles.map(profile => (
        <Profile key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default MatchRequestsPageComponent;
