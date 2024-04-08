"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // You need 'js-cookie' package for this
import "./App.css";
import Profile from "./Profile";

const Matches = () => {
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchedToken = localStorage.getItem('access_token');
    const fetchedCsrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies

    setToken(fetchedToken);
    setCsrfToken(fetchedCsrfToken);

    if (!fetchedToken) {
      setError('User is not authenticated');
      setIsLoading(false);
      return;
    }

    console.log(fetchedToken);
    console.log(fetchedCsrfToken);

    setIsLoading(true);
    
    axios.get('http://127.0.0.1:8000/user-list/', {
    })
    .then(response => {
      setUsernames(response.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const profiles = usernames.map((username, i) => ({
    id: i,
    name: username,
    skills: ["Python", "Django", "JavaScript"],
    interests: ["Web Development", "Machine Learning"],
    imageUrl: "https://via.placeholder.com/150",
  }));

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="/mainpage">Home</a></li>
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
    </div>
  );
};

export default Matches;
