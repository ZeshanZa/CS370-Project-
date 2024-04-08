import React, { useState, useEffect } from "react";
import axios from 'axios';

function Profile({ profile }) {
  const [sender, setSender] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-username/', {
          headers: { 'Authorization': `Token ${token}` }
        });
        const { username } = response.data;
        setSender(username); // Set the sender username in state
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername(); 
  }, [token, profile]);

  const sendMatchRequest = () => {
    if (!token) {
      console.error('No access token available.');
      return;
    }

    if (!sender) {
      console.error('Sender username not available.');
      return;
    }

    console.log(sender); 
    const receiver = profile.name;
    console.log(receiver); 

    fetch(`http://127.0.0.1:8000/send-match-request/${sender}/${receiver}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert(`Match request sent to: ${receiver}`);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending match request');
    });
  };

  return (
    <section className="profile-detail">
      <img src={profile.imageUrl} alt="Profile" className="profile-picture" />
      <h1>{profile.name}</h1>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>Interested in: {profile.interests.join(", ")}</p>
      <button onClick={sendMatchRequest}>
        Match
      </button>
    </section>
  );
}

export default Profile;
