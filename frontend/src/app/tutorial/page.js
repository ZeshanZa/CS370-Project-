"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useTour } from "./tourContext";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [isUsernameFetched, setIsUsernameFetched] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const { startTour } = useTour();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/get-username/ ",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setUsername(response.data.username || "");
        setIsUsernameFetched(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    // Assuming the whole animation sequence takes approximately 5 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 7000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        {isUsernameFetched && (
          <TypeAnimation
            sequence={
              isUsernameFetched && [
                `Welcome to Emory Connect ${username}`,
                1000,
                `Click continue to explore`,
                1000,
              ]
            }
            wrapper="span"
            speed={10}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={0}
            omitDeletionAnimation={true}
          />
        )}
      </h1>
      <div classname="absolute bottom-0 inset-x-0 flex justify-center pb-10"></div>
      {showButton && (
        <button
          className="mt-8 px-2 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300"
          onClick={() => {
            router.push("/test");
          }}
        >
          {" "}
          Continue
        </button>
      )}
    </div>
  );
};

export default UserProfile;
