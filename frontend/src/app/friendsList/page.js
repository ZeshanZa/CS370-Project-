"use client" 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function FriendsList() {
    const [friends, putFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      
      fetch('http://127.0.0.1:8000/friendsList/', { // Ensure the endpoint matches your Django URL
        headers: { 'Authorization': `Token ${token}` }
      })
      .then(response => {
        putFriends(response.data);
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



console.log(friends)

return (
    <div className="App">
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
      {friends}
    </div>
  );
};
export default FriendsList;