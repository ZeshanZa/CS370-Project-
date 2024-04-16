"use client" 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import Profile from "./Profile";
import Layout from '../Layouts/Layout';

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token');
    
    axios.get('http://3.91.27.166:8000/user-matches/', {
      headers: { 'Authorization': `Token ${token}` }
    })
    .then(response => {
      setMatches(response.data);
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

  // Filter and map the matches to the expected structure for the Profile component
  const profiles = matches.filter(match => match.status === "accepted").map(match => ({
    id: match.id,
    name: match.other_user, // Assuming 'other_user' is the field returned by your API
    skills: match.skills || ["Python", "Django", "JavaScript"], // Temporary skills, replace with actual data
    interests: match.interests || ["Web Development", "Machine Learning"], // Temporary interests, replace with actual data
    imageUrl: match.imageUrl || "https://via.placeholder.com/150" // Temporary image URL, replace with actual data
  }));

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="/mainpage">Home</a></li>
            <li><a href="/startMatching">Start Matching</a></li>
            <li><a href="/match-requests">Your Requests</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/setpage">Settings</a></li>
          </ul>
        </nav>
      </header>
      <main className="profiles-container">
        {profiles.map(profile => (
          <Profile key={profile.id} profile={profile}/>
        ))}
      </main>
    </div>
  );
};

export default MatchesList;
