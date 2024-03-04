import React from "react";

function Profile({ profile }) {
  return (
    <section className="profile-detail">
      <img src={profile.imageUrl} alt="Profile" className="profile-picture" />
      <h1>{profile.name}</h1>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>Interested in: {profile.interests.join(", ")}</p>
      <button
        onClick={() => alert(`Starting a conversation with ${profile.name}...`)}
      >
        Accept Match
      </button>
      <button
        onClick={() => alert(`Starting a conversation with ${profile.name}...`)}
      >
        Decline Match
      </button>
    </section>
  );
}

export default Profile;
