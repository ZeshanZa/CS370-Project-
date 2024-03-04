"use client"

import React from "react";
import "./App.css"; // Make sure to import the CSS for styling
import Profile from "./Profile"; // Import your Profile component

function App() {
  const profiles = [
    {
      id: 1,
      name: "Alex Johnson",
      skills: ["Python", "Django", "JavaScript"],
      interests: ["Web Development", "Machine Learning"],
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Maria Garcia",
      skills: ["Java", "Spring Boot", "React"],
      interests: ["Full Stack Development", "Cloud Services"],
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "David Smith",
      skills: ["C#", ".NET Core", "Angular"],
      interests: ["Enterprise Software", "Game Development"],
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Linda Brown",
      skills: ["PHP", "Laravel", "Vue.js"],
      interests: ["E-commerce Sites", "Web Apps"],
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "James Wilson",
      skills: ["Ruby", "Rails", "React"],
      interests: ["Startup Projects", "API Development"],
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Emily Clark",
      skills: ["Python", "Flask", "JavaScript"],
      interests: ["Data Analysis", "Backend Development"],
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <a href="/mainpage">Home</a>
            </li>
            <li>
              <a href="/matches">Matches</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/setpage">Settings</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="profiles-container">
        {profiles.map((profile) => (
          <Profile key={profile.id} profile={profile} />
        ))}
      </main>
    </div>
  );
}

export default App;
