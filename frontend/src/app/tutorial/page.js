"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [isUsernameFetched, setIsUsernameFetched] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/get-username/`,
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
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        {isUsernameFetched && (
          <TypeAnimation
            sequence={
              isUsernameFetched && [
                `Welcome to Emory Connect ${username} !`,
                1000,
                `Click continue for a tour or skip to sign in`,
                1000,
              ]
            }
            wrapper="span"
            speed={1}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={0}
            omitDeletionAnimation={true}
          />
        )}
      </h1>

      <div class="pt-8 pl-80 space-x-4">
        {showButton && (
          <>
            <button
              class="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300 text-sm"
              onClick={() => {
                router.push("/mainpage");
                localStorage.setItem("needTutorial", "yes");
              }}
            >
              Continue
            </button>
            <button
              class="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition duration-300 text-sm"
              onClick={() => {
                localStorage.setItem("needTutorial", "no");
                router.push("mainpage");
              }}
            >
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
