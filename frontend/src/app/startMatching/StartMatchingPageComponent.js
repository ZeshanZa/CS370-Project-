"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // You need 'js-cookie' package for this
//import "./App.css";
import Profile from "./Profile";
import Layout from "../Layouts/Layout";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const StartMatchingPageComponent = () => {
  console.log("PAGE LOADED");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [newProfiles, setMatchProfiles] = useState(null);
  const [loadingPercent, setLPercent] = useState(0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  useEffect(() => {
    const fetchedToken = localStorage.getItem("access_token");
    const fetchedCsrfToken = Cookies.get("csrftoken"); // Get CSRF token from cookies

    setToken(fetchedToken);
    setCsrfToken(fetchedCsrfToken);

    if (!fetchedToken) {
      setError("User is not authenticated");
      setIsLoading(false);
      return;
    }

    console.log(fetchedToken);
    console.log(fetchedCsrfToken);

    setIsLoading(true);

    console.log("HOOK CALLED");
  }, []);

  useEffect(() => {
    //functions:
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("access_token")}`,
            },
          }
        );
        return response.data.user; // Set the sender uuid in state
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    async function FilterMatches(usernames, uuid) {
      //console.log("ALGO LOADED")
      //console.log(usernames)

      const profiles = usernames.map((profile_user) => ({
        id: profile_user.id,
        name: profile_user.username,
        skills: ["Python", "Django", "JavaScript"],
        interests: ["Web Development", "Machine Learning"],
        imageUrl: "https://via.placeholder.com/150",
        matchscore: -1,
        matchedSkills: [],
      }));

      //console.log(profiles)

      //const skillsIhave = ["Python", "Java", "Css", "HTML"]
      //const skillsIwant = ["Python", "Django", "Ruby"]

      //if (uuid) { getUserSkills(uuid).then((skills) => console.log(skills)) }
      const myskills = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/skills/${uuid}/get-complete-skills/`
      ); //fetched my own skills
      const allSkills = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/skills/`
      );
      const MatchesTotal = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user-matches/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_token")}`,
          },
        }
      );
      //console.log(MatchesTotal)
      //console.log(allSkills.data)
      let SkillMap = {};
      for (let i = 0; i < allSkills.data.length; i++) {
        SkillMap[allSkills.data[i].user] = {
          data: {
            acquired: allSkills.data[i].acquired,
            search: allSkills.data[i].search,
          },
        };
      }
      //console.log(SkillMap)
      //console.log(myskills)

      //initial scores
      let bestscore1 = -1;
      let user1;
      let bestscore2 = -1;
      let user2;
      let bestscore3 = -1;
      let user3;

      let currentUsername = ""

      for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].id == uuid){
          currentUsername = profiles[i].name
        }
      }

      let deleted = []

      try {
        const responseDeleted = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/view-deleted-matches/${currentUsername}/`,
          {
            headers: { Authorization: `Token ${localStorage.getItem("access_token")}` },
          }
        );
        deleted = responseDeleted.data["deleted matches"]
      } catch (error) {
        console.error("Error fetching declined matches:", error);
      }
      //console.log(deleted)

      //MATCHING ALGORYTHM
      //step 1 - sort through all users
      for (let i = 0; i < profiles.length; i++) {
        //console.log(profiles[i].name)
        //console.log(`${(i+1)/profiles.length*100}% is complete`)
        setLPercent(((i + 1) / profiles.length) * 100);
        let score = 0; //assign a score to each potential match
        //step 2 - get the user's id and fetch the skills
        //const targetId = await axios.get(
        //  `${process.env.NEXT_PUBLIC_API_URL}/user-id/${profiles[i].name}/`
        //);
        //console.log(targetId)
        if (profiles[i].id == uuid) {
          continue; //we make sure we dont collect out of skills and thus dont match to ourself
        }
        let Flag = false;

        if (deleted.length > 0){
          for (let q = 0; q < deleted.length; q++) {
            if (deleted[q] == profiles[i].name){
              Flag = true;
            }
          }
        }

        for (let imt = 0; imt < MatchesTotal.data.length; imt++) {
          if (MatchesTotal.data[imt].other_user == profiles[i].name) {
            Flag = true;
          }
        }
        if (Flag) {
          continue;
        }

        //const targetSkills = await axios.get(`http://127.0.0.1:8000/skills/${targetId.data}/get-complete-skills/`);
        //console.log(SkillMap[profiles[i].id])
        //console.log(SkillMap)
        //console.log(profiles.id)
        //console.log("---")
        //console.log(profiles)
        const targetSkills = SkillMap[profiles[i].id];

        //console.log(targetSkills.data)
        //step 3 - the matching begins
        //3.1 - we looks through skills they want | we have 4 arrays of skills we want and 4 arrays of skills we have, same for them
        //console.log(myskills.data.acquired.DB)
        //console.log(targetSkills.data.search.DB)
        var matchedSkills = []
        for (let ime = 0; ime < myskills.data.acquired.DB.length; ime++) {
          for (
            let ithem = 0;
            ithem < targetSkills.data.search.DB.length;
            ithem++
          ) {
            if (
              myskills.data.acquired.DB[ime] ==
              targetSkills.data.search.DB[ithem]
            ) {
              matchedSkills.push(myskills.data.acquired.DB[ime])
              score += 1;
              //console.log(myskills.data.acquired.DB[ime], targetSkills.data.search.DB[ithem])
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Exp.length; ime++) {
          for (
            let ithem = 0;
            ithem < targetSkills.data.search.Exp.length;
            ithem++
          ) {
            if (
              myskills.data.acquired.Exp[ime] ==
              targetSkills.data.search.Exp[ithem]
            ) {
              matchedSkills.push(myskills.data.acquired.Exp[ime])
              score += 1;
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Lang.length; ime++) {
          for (
            let ithem = 0;
            ithem < targetSkills.data.search.Lang.length;
            ithem++
          ) {
            if (
              myskills.data.acquired.Lang[ime] ==
              targetSkills.data.search.Lang[ithem]
            ) {
              matchedSkills.push(myskills.data.acquired.Lang[ime])
              score += 1;
              //console.log(myskills.data.acquired.Lang[ime], targetSkills.data.search.Lang[ithem])
            }
          }
        }
        for (let ime = 0; ime < myskills.data.acquired.Pers.length; ime++) {
          for (
            let ithem = 0;
            ithem < targetSkills.data.search.Pers.length;
            ithem++
          ) {
            if (
              myskills.data.acquired.Pers[ime] ==
              targetSkills.data.search.Pers[ithem]
            ) {
              matchedSkills.push(myskills.data.acquired.Pers[ime])
              score += 1;
            }
          }
        }

        //3.2 - we looks through skills we want

        for (
          let ithem = 0;
          ithem < targetSkills.data.acquired.DB.length;
          ithem++
        ) {
          for (let ime = 0; ime < myskills.data.search.DB.length; ime++) {
            if (
              myskills.data.search.DB[ime] ==
              targetSkills.data.acquired.DB[ithem]
            ) {
              matchedSkills.push(myskills.data.search.DB[ime])
              score += 1;
              //console.log(myskills.data.search.DB[ime], targetSkills.data.acquired.DB[ithem])
            }
          }
        }
        for (
          let ithem = 0;
          ithem < targetSkills.data.acquired.Exp.length;
          ithem++
        ) {
          for (let ime = 0; ime < myskills.data.search.Exp.length; ime++) {
            if (
              myskills.data.search.Exp[ime] ==
              targetSkills.data.acquired.Exp[ithem]
            ) {
              matchedSkills.push(myskills.data.search.Exp[ime])
              score += 1;
            }
          }
        }
        for (
          let ithem = 0;
          ithem < targetSkills.data.acquired.Lang.length;
          ithem++
        ) {
          for (let ime = 0; ime < myskills.data.search.Lang.length; ime++) {
            if (
              myskills.data.search.Lang[ime] ==
              targetSkills.data.acquired.Lang[ithem]
            ) {
              matchedSkills.push(myskills.data.search.Lang[ime])
              score += 1;
              //console.log(myskills.data.search.Lang[ime], targetSkills.data.acquired.Lang[ithem])
            }
          }
        }
        for (
          let ithem = 0;
          ithem < targetSkills.data.acquired.Pers.length;
          ithem++
        ) {
          for (let ime = 0; ime < myskills.data.search.Pers.length; ime++) {
            if (
              myskills.data.search.Pers[ime] ==
              targetSkills.data.acquired.Pers[ithem]
            ) {
              matchedSkills.push(myskills.data.search.Pers[ime])
              score += 1;
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
          bestscore1 = score;
          user3 = user2;
          user2 = user1;
          user1 = profiles[i];
          user1.matchscore = bestscore1;
          user1.skills = targetSkills.data.acquired;
          user1.matchedSkills = matchedSkills
          user1.pscore =
            (bestscore1) /
            (targetSkills.data.search.DB.length +
              targetSkills.data.search.Exp.length +
              targetSkills.data.search.Lang.length +
              targetSkills.data.search.Pers.length +
              myskills.data.search.DB.length +
              myskills.data.search.Exp.length +
              myskills.data.search.Lang.length +
              myskills.data.search.Pers.length);
        } else if (score > bestscore2) {
          bestscore2 = score;
          user3 = user2;
          user2 = profiles[i];
          user2.matchscore = bestscore2;
          user2.skills = targetSkills.data.acquired;
          user2.matchedSkills = matchedSkills
          user2.pscore =
            (bestscore2) /
            (targetSkills.data.search.DB.length +
              targetSkills.data.search.Exp.length +
              targetSkills.data.search.Lang.length +
              targetSkills.data.search.Pers.length +
              myskills.data.search.DB.length +
              myskills.data.search.Exp.length +
              myskills.data.search.Lang.length +
              myskills.data.search.Pers.length);
        } else if (score > bestscore3) {
          bestscore3 = score;
          user3 = profiles[i];
          user3.matchscore = bestscore3;
          user3.skills = targetSkills.data.acquired;
          user3.matchedSkills = matchedSkills
          user3.pscore =
            (bestscore3) /
            (targetSkills.data.search.DB.length +
              targetSkills.data.search.Exp.length +
              targetSkills.data.search.Lang.length +
              targetSkills.data.search.Pers.length +
              myskills.data.search.DB.length +
              myskills.data.search.Exp.length +
              myskills.data.search.Lang.length +
              myskills.data.search.Pers.length);
        }
      }
      //END OF MATCHING ALGORYTHM

      //console.log(usernames)
      //console.log([user1, user2, user3])

      return [user1, user2, user3];
    }
    //
    fetchUsername().then((uuid) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/userslist/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          //console.log(response.data)
          FilterMatches(response.data, uuid).then((newProfiles) =>
            setMatchProfiles(newProfiles)
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
          setIsLoading(false);
        });
    });
  }, []);

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
    console.log(newProfiles);
    {
      /* <Layout>
        <div className='w-full items-center flex justify-center flex-wrap'>
          {newProfiles.map(profile => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </div>
        </Layout> */
    }
    return (
      <div className="w-full items-center flex justify-center flex-wrap">
        {newProfiles.map((profile) => (
          <Profile key={profile?.id} profile={profile} />
        ))}
        {(!newProfiles[0] && !newProfiles[1] && !newProfiles[2]) ? <text className="font-semibold text-xl text-slate-700">Look you ran out of matches. Come back later.</text> : <></>}
      </div>
    );
  } else {
    return (
      <div className="items-center flex justify-center w-full h-full">
        <Box sx={{ width: "80%" }}>
          <div className="w-full items-center flex justify-center">
            <img
              src="https://alliedforum.net/wp-content/uploads/sites/313/2020/02/high-performing-team.jpg"
              className="items-center min-[750px]:max-w-[40%]"
              alt="image_match"
            />
          </div>
          <text> Finding Your Matches...</text>
          <LinearProgressWithLabel value={loadingPercent} />
        </Box>
      </div>
      /*Loading {Math.round(loadingPercent)}%*/
    );
  }
};

export default StartMatchingPageComponent;
