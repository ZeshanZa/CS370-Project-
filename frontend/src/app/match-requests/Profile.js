"use client"

import React, { useEffect, useState } from "react";
import axios from 'axios';

function Profile({ profile }) {
  const token = localStorage.getItem('access_token');
  const [skills, setSkills] = useState("")

  useEffect(() => {
    async function getUserSkills(name) {
      const user_id = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user-id/${name}/`);
      //console.log(user_id)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills/${user_id.data}/get-complete-skills/`);
      const { acquired, search } = response.data;
      //console.log(acquired)
      return acquired
    }
    getUserSkills(profile.name).then((skills) => setSkills(skills))
  }, [])

  const acceptMatch = async () => {
    if (!token) {
      console.error('No access token available.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accept-match-request/${profile.name}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert(`Match request with ${profile.name} accepted.`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error acceptingg match request');
    }
  };

  const declineMatch = async () => {
    if (!token) {
      console.error('No access token available.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decline-match/${profile.name}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert(`Match request with ${profile.name} declined.`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error declining match request');
    }
  };

  if (skills) {
    return (
      /* <section className="profile-detail">
        <img src={profile.imageUrl} alt="Profile" className="profile-picture" />
        <h1>{profile.name}</h1>
        <p>Skills: {profile.skills.join(", ")}</p>
        <p>Interested in: {profile.interests.join(", ")}</p>
        <button
          onClick={acceptMatch}
        >
          Accept Match
        </button>
        <button onClick={declineMatch}>
          Decline Match
        </button>
      </section> */
      <div className="w-96 m-2 p-3 items-center flex-col flex justify-center break-words rounded-2xl border-[1px] border-slate-200 shadow-sm">
        {/*<img src={profile.imageUrl} alt="Profile_picture" />*/}
        <img src="./pfp.jpg" alt='Profile picture' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <text className="text-xl font-semibold">{profile.name}</text>
        <text className="w-full my-2 px-2">Skills (DB): {skills.DB.join(", ")}</text>
        <text className="w-full my-2 px-2">Skills (Experiances): {skills.Exp.join(", ")}</text>
        <text className="w-full my-2 px-2">Skills (Languages): {skills.Lang.join(", ")}</text>
        <text className="w-full my-2 px-2">Skills (Personal): {skills.Pers.join(", ")}</text>
        <div className="flex flex-row justify-between w-full px-6 my-2">
          <button onClick={declineMatch} className="bg-sky-500 text-white font-semibold p-1 rounded-lg">
            Decline Match
          </button>
          <button onClick={acceptMatch} className="bg-sky-500 text-white font-semibold p-1 rounded-lg">
            Accept Match
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>Loading</>
    )
  }
}

export default Profile;
