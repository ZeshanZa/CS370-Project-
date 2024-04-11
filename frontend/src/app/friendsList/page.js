"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "./App.css";
import FriendComponent from "../components/FriendComponent"
import Layout from '../Layouts/Layout';

function FriendsList() {
  const [friends, putFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/friendsList/detailedFriendsList', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        putFriends(response.data); // friends here
        //console.log(response.data)
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends().then(() => {setIsLoading(false)})

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  console.log(friends)

  /*return (
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
      <div className='w-full items-center flex justify-center'>
        {friends.map(friend => (
          <FriendComponent name={friend.username} skills={["Java ", "Python ", "CSS "]} github={friend.email}/>
        ))}
      </div>
    </div>
  );*/
  return(
    <Layout>
      <div className='w-full items-center flex justify-center'>
        {friends.map(friend => (
          <FriendComponent name={friend.username} skills={["Java ", "Python ", "CSS "]} github={friend.email}/>
        ))}
      </div>
    </Layout>
  )
};
export default FriendsList;