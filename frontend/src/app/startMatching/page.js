"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // You need 'js-cookie' package for this
//import "./App.css";
import Profile from "./Profile";
import Layout from '../Layouts/Layout';

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

    axios.get('http://3.91.27.166:8000/user-list/', {
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

  const skillsIhave = ["Python", "Java", "Css", "HTML"]
  const skillsIwant = ["Python", "Django", "Ruby"]

  let bestscore1 = 0
  let user1
  let bestscore2 = 0
  let user2
  let bestscore3 = 0
  let user3

  for (let i = 0; i < profiles.length; i++) {
    let score = 0
    for (let q = 0; q < skillsIwant.length; q++) {
      for (let j = 0; j < profiles[i].skills.length; j++) {
        if (skillsIwant[q] == profiles[i].skills[j]) {
          score += 1
        }
      }
    }
    if (score > bestscore1) {
      bestscore1 = score
      user3 = user2
      user2 = user1
      user1 = profiles[i]
    } else if (score > bestscore2) {
      bestscore2 = score
      user3 = user2
      user2 = profiles[i]
    } else if (score > bestscore3) {
      bestscore3 = score
      user3 = profiles[i]
    }
  }

  const newProfiles = [user1, user2, user3]

  /*return (
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
        {newProfiles.map(profile => (
          <Profile key={profile.id} profile={profile} />
        ))}
      </main>
    </div>
  );*/
  return (
    <Layout>
      <div className='w-full items-center flex justify-center flex-wrap'>
        {newProfiles.map(profile => (
          <Profile key={profile.id} profile={profile} />
        ))}
      </div>
    </Layout>
  )
};

export default Matches;
