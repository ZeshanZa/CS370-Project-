import React from "react";

function Profile({ profile }) {
  const token = localStorage.getItem('access_token');

  const acceptMatch = async () => {
    if (!token) {
      console.error('No access token available.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/accept-match-request/${profile.name}/`, {
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
      const response = await fetch(`http://3.91.27.166:8000/decline-match/${profile.name}/`, {
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

  return (
    <section className="profile-detail">
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
    </section>
  );
}

export default Profile;
