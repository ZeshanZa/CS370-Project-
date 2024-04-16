"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // You need 'js-cookie' package for this
//import "./App.css";
import Profile from "./Profile";
import Layout from '../Layouts/Layout';

const Matches = () => {
  console.log("PAGE LOADED")
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [newProfiles, setMatchProfiles] = useState(null)

  useEffect(() => {
    const fetchedToken = localStorage.getItem('access_token');
    const fetchedCsrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies

    setToken(fetchedToken);
    setCsrfToken(fetchedCsrfToken);

    if (!fetchedToken) {
      setError('User is not authenticated');
      setIsLoading(false);
      return;
    }

    console.log(fetchedToken);
    console.log(fetchedCsrfToken);

    setIsLoading(true);

    console.log("HOOK CALLED")
  }, []);

  useEffect(() => {
    //functions:
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/profile/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('access_token')}`,
          },
        });
        return (response.data.user); // Set the sender uuid in state
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    async function getUserSkills(user_id) {
      console.log("SKILLS FOUND")
      const response = await axios.get(`http://127.0.0.1:8000/skills/${user_id}/get-complete-skills/`);
      const { acquired, search } = response.data;
      return [search, acquired]
    }

    async function FilterMatches(usernames, uuid) {
      //console.log("ALGO LOADED")
      //console.log(usernames)

      const profiles = usernames.map((username, i) => ({
        id: i,
        name: username,
        skills: ["Python", "Django", "JavaScript"],
        interests: ["Web Development", "Machine Learning"],
        imageUrl: "https://via.placeholder.com/150",
        matchscore: -1,
      }));

      const skillsIhave = ["Python", "Java", "Css", "HTML"]
      const skillsIwant = ["Python", "Django", "Ruby"]

      //if (uuid) { getUserSkills(uuid).then((skills) => console.log(skills)) }
      const myskills = await axios.get(`http://127.0.0.1:8000/skills/${uuid}/get-complete-skills/`); //fetched my own skills
      //console.log(myskills)

      //initial scores
      let bestscore1 = -1
      let user1
      let bestscore2 = -1
      let user2
      let bestscore3 = -1
      let user3

      //MATCHING ALGORYTHM
      //step 1 - sort through all users
      for (let i = 0; i < profiles.length; i++) {
        //console.log(profiles[i].name)
        console.log(`${(i+1)/profiles.length*100}% is complete`)
        let score = 0 //assign a score to each potential match
        //step 2 - get the user's id and fetch the skills
        const targetId = await axios.get(`http://127.0.0.1:8000/user-id/${profiles[i].name}/`);
        //console.log(targetId)
        if (targetId.data == uuid) {
          continue; //we make sure we dont collect out of skills and thus dont match to ourself
        }
        const targetSkills = await axios.get(`http://127.0.0.1:8000/skills/${targetId.data}/get-complete-skills/`);
        //console.log(targetSkills.data)
        //step 3 - the matching begins
        //3.1 - we looks through skills they want | we have 4 arrays of skills we want and 4 arrays of skills we have, same for them
        //console.log(myskills.data.acquired.DB)
        //console.log(targetSkills.data.search.DB)
        for (let ime = 0; ime < myskills.data.acquired.DB.length; ime++) {
          for (let ithem = 0; ithem < targetSkills.data.search.DB.length; ithem++) {
            if (myskills.data.acquired.DB[ime] == targetSkills.data.search.DB[ithem]){
              score += 1
              //console.log(myskills.data.acquired.DB[ime], targetSkills.data.search.DB[ithem])
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Exp.length; ime++) {
          for (let ithem = 0; ithem < targetSkills.data.search.Exp.length; ithem++) {
            if (myskills.data.acquired.Exp[ime] == targetSkills.data.search.Exp[ithem]){
              score += 1
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Lang.length; ime++) {
          for (let ithem = 0; ithem < targetSkills.data.search.Lang.length; ithem++) {
            if (myskills.data.acquired.Lang[ime] == targetSkills.data.search.Lang[ithem]){
              score += 1
              //console.log(myskills.data.acquired.Lang[ime], targetSkills.data.search.Lang[ithem])
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Pers.length; ime++) {
          for (let ithem = 0; ithem < targetSkills.data.search.Pers.length; ithem++) {
            if (myskills.data.acquired.Pers[ime] == targetSkills.data.search.Pers[ithem]){
              score += 1
            }
          }
        }

        //3.2 - we looks through skills we want

        for (let ithem = 0; ithem < targetSkills.data.acquired.DB.length; ithem++) {
          for (let ime = 0; ime < myskills.data.search.DB.length; ime++) {
            if (myskills.data.search.DB[ime] == targetSkills.data.acquired.DB[ithem]){
              score += 1
              //console.log(myskills.data.search.DB[ime], targetSkills.data.acquired.DB[ithem])
            }
          }
        }
        for (let ithem = 0; ithem < targetSkills.data.acquired.Exp.length; ithem++) {
          for (let ime = 0; ime < myskills.data.search.Exp.length; ime++) {
            if (myskills.data.search.Exp[ime] == targetSkills.data.acquired.Exp[ithem]){
              score += 1
            }
          }
        }
        for (let ithem = 0; ithem < targetSkills.data.acquired.Lang.length; ithem++) {
          for (let ime = 0; ime < myskills.data.search.Lang.length; ime++) {
            if (myskills.data.search.Lang[ime] == targetSkills.data.acquired.Lang[ithem]){
              score += 1
              //console.log(myskills.data.search.Lang[ime], targetSkills.data.acquired.Lang[ithem])
            }
          }
        }
        for (let ithem = 0; ithem < targetSkills.data.acquired.Pers.length; ithem++) {
          for (let ime = 0; ime < myskills.data.search.Pers.length; ime++) {
            if (myskills.data.search.Pers[ime] == targetSkills.data.acquired.Pers[ithem]){
              score += 1
            }
          }
        }
        /*for (let q = 0; q < skillsIwant.length; q++) {
          for (let j = 0; j < profiles[i].skills.length; j++) {
            if (skillsIwant[q] == profiles[i].skills[j]) {
              score += 1
            }
          }
        }*/
        if (score > bestscore1) {
          bestscore1 = score
          user3 = user2
          user2 = user1
          user1 = profiles[i]
          user1.matchscore = bestscore1;
        } else if (score > bestscore2) {
          bestscore2 = score
          user3 = user2
          user2 = profiles[i]
          user2.matchscore = bestscore2;
        } else if (score > bestscore3) {
          bestscore3 = score
          user3 = profiles[i]
          user3.matchscore = bestscore3;
        }
      }
      //END OF MATCHING ALGORYTHM

      console.log(usernames)
      console.log([user1, user2, user3])

      return [user1, user2, user3]
    }
    //
    fetchUsername().then((uuid) => {
      axios.get('http://127.0.0.1:8000/user-list/', {
      })
        .then(response => {
          FilterMatches(response.data, uuid).then((newProfiles) => setMatchProfiles(newProfiles))
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Error fetching data');
          setIsLoading(false);
        });
    })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  /*return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="/mainpage">Home</a></li>
            <li><a href="/matches">Your Matches</a></li>
            <li><a href="/match-requests">Your Requests</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/setpage">Settings</a></li>
          </ul>
        </nav>
      </header>
      <main className="profiles-container">
        {newProfiles.map(profile => (
          <Profile key={profile.id} profile={profile} />
        ))}
      </main>
    </div>
  );*/
  if (newProfiles) {
    console.log(newProfiles)
    return (
      <Layout>
        <div className='w-full items-center flex justify-center flex-wrap'>
          {newProfiles.map(profile => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </div>
      </Layout>
    )
  } else {
    return (
      <>
        Loading
      </>
    )
  }
};

export default Matches;
