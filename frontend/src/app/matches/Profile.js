import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css'; 
import './modal.css';

function Profile({ profile }) {
  const [modal, setModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      fetchProfileData(profile.name);
    }
  };

  const fetchProfileData = () => {
    const username = profile.name; 
    setIsLoading(true);
    const token = localStorage.getItem('access_token');
    axios.get(`http://3.91.27.166:8000/matched-profile/${username}`, {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(response => {
        setProfileData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <section className="profile-detail">
      {modal && (
        <div className='modal'>
          <div className='overlay'></div>
          <div className='modal-content flex flex-col justify-center'>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <>
                <h2 className='flex justify-center'>{profileData?.full_name}</h2>
                <div className='flex flex-col'>
                  <div className='flex justify-center'><img src={profile.imageUrl} alt="Profile" className="profile-picture flex justify-center" /></div>
                  <p>Major: {profileData?.major}</p><br></br>
                  <p>Bio: {profileData?.bio}</p><br></br>
                  <p>Github: {profileData?.github_url} </p>
                </div>
                <button onClick={toggleModal} className='close-modal'>Close</button>
              </>
            )}
          </div>
        </div>
      )}
      <img src={profile.imageUrl} alt="Profile" className="profile-picture" />
      <button onClick={toggleModal}>{profile.name}</button>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>Interested in: {profile.interests.join(", ")}</p>
    </section>
  );
}

export default Profile;
