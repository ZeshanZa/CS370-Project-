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
      
      axios.get('http://127.0.0.1:8000/friendsList/', { // Ensure the endpoint matches your Django URL
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

const friendElement = FriendsList.map(friend => ({
    id: friend.username, // Assuming 'sender_id' is the field returned by your API
    name: friend.name, // Assuming 'sender' is the field returned by your API
    skills: ["Python", "Django", "JavaScript"], // Temporary skills, replace with actual data if available
    interests: ["Web Development", "Machine Learning"], // Temporary interests, replace with actual data if available
    imageUrl: "https://via.placeholder.com/150" // Temporary image URL, replace with actual data if available
  }));


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
      <main className="friendsList-container">
        {FriendsList.map(friendElement => (
          <friendElement key={friendElement.id} friendElement={friendElement} />
        ))}
      </main>
    </div>
  );
};
export default FriendsList;