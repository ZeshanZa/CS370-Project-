import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ profile }) {
  const [sender, setSender] = useState(null);
  
  if (!profile){
    return(
      <></>
    )
  }
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/get-username/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        const { username } = response.data;
        setSender(username); // Set the sender username in state
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [token, profile]);

  const sendMatchRequest = () => {
    if (!token) {
      console.error("No access token available.");
      return;
    }

    if (!sender) {
      console.error("Sender username not available.");
      return;
    }

    console.log(sender);
    const receiver = profile.name;
    console.log(receiver);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/send-match-request/${sender}/${receiver}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(`Match request sent to: ${receiver}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending match request");
      });
  };

  return (
    /*<section className="profile-detail">
      <img src={profile.imageUrl} alt="Profile" className="profile-picture" />
      <h1>{profile.name}</h1>
      <p>Skills: {profile.skills.join(", ")}</p>
      <p>Interested in: {profile.interests.join(", ")}</p>
      <button onClick={sendMatchRequest}>
        Match
      </button>
    </section>*/

    //this component can be in accept/deny matching:

    /*<div className="w-96 m-2 p-3 items-center flex-col flex justify-center break-words rounded-2xl border-[1px] border-slate-200 shadow-sm">
      <img src={profile.imageUrl} alt="Profile_picture" />
      <text className="text-xl font-semibold">{profile.name}</text>
      <text className="w-full my-2 px-2">Skills: {profile.skills.join(", ")}</text>
      <text className="w-full px-2">Interested in: {profile.interests.join(", ")}</text>
      <div className="flex flex-row justify-between w-full px-6 my-2">
        <button onClick={() => {console.log("match declined")}} className="bg-sky-500 text-white font-semibold p-1 rounded-lg">
          Decline Match
        </button>
        <button onClick={sendMatchRequest} className="bg-sky-500 text-white font-semibold p-1 rounded-lg">
          Accept Match
        </button>
      </div>
    </div>*/

    <div className="w-96 m-2 p-3 items-center flex-col flex justify-center break-words rounded-2xl border-[1px] border-slate-200 shadow-sm">
      <img src={profile.imageUrl} alt="Profile_picture" />
      <text className="text-xl font-semibold">{profile.name}</text>
      <text>
        {" "}
        Match Score = <span className="font-bold">{profile.matchscore}</span>
      </text>
      <text>
        {" "}
        Match % ={" "}
        <span
          className={
            Math.round(profile.pscore * 100) > 50
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {Math.round(profile.pscore * 100)}
        </span>
      </text>
      <text className="w-full my-2 px-2 font-bold underline underline-offset-2">
        Skills:{" "}
      </text>
      <text className="w-full my-2 px-2">
        DB: {profile.skills.DB.join(", ")}
      </text>
      <text className="w-full my-2 px-2">
        Experiences: {profile.skills.Exp.join(", ")}
      </text>
      <text className="w-full my-2 px-2">
        Languages: {profile.skills.Lang.join(", ")}
      </text>
      <text className="w-full my-2 px-2">
        Personal: {profile.skills.Pers.join(", ")}
      </text>
      {profile.matchedSkills ? <text className="w-full my-2 px-2 font-bold">
        Matched Skills: {profile.matchedSkills.join(", ")}
      </text> : <text className="w-full my-2 px-2 font-bold"> No skills matched</text>}
      {/*<text className="w-full px-2">Interested in: {profile.interests.join(", ")}</text>*/}
      <div className="flex flex-row justify-center w-full px-6 my-2">
        <button
          onClick={sendMatchRequest}
          className="bg-blue-500 text-white font-semibold p-2 rounded-lg"
        >
          Send Match Request
        </button>
      </div>
    </div>
  );
}

export default Profile;
