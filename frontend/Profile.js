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
        Start a Conversation
      </button>
    </section>
  );
}

export default Profile;
