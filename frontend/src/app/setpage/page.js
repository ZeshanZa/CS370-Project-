"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layouts/Layout";

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState(""); // State for storing username
  const [email, setEmail] = useState(""); // State for storing email

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token"); //Their may be a better way to handle storing tokens
      try {
        const response = await axios.get(
          "https://econnectbackend.click:8000/api/auth/user/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., redirect to login page if unauthorized) Im trying to figure out a simple way to do the token refreshing since I make them expire each hour
      }
    };

    fetchUserData();
  }, []); // The empty array ensures this effect runs only once after the initial render

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    // Retrieve the token within this function
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found");
      alert("You are not logged in. Please log in and try again.");
      return; // Exit the function if no token is found
    }

    const headers = {
      Authorization: `Token ${token}`, // Use the token directly from localStorage
    };

    const payload = {
      new_password1: newPassword,
      new_password2: confirmNewPassword,
    };

    try {
      const response = await axios.post(
        "https://econnectbackend.click:8000/api/auth/password/change/",
        payload,
        { headers }
      );
      console.log("Password changed successfully", response.data);
      alert("Password changed successfully");
      // Optional: Redirect the user or force a logout here When you guys edit frontend plz add this
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error);
      alert("Error changing password");
    }
  };

  return (
    <Layout>
      <text className="ml-5 text-3xl text-slate-800 font-semibold">
        {" "}
        Change Password{" "}
      </text>
      <div className="ml-12 w-32 border-4 border-blue-400 rounded-full my-2"></div>
      <div className="flex w-full flex-col items-center justify-start min-h-screen bg-white-A700 pt-5 md:pt-2">
        <div className=" flex w-[30%] flex-col items-center gap-[10px] self-center rounded-[20px] border-2 border-solid border-gray-300 bg-white-A700 p-[30px] ">
          <div
            style={{
              maxWidth: "100%",
              width: "500px",
              margin: "5vh auto",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label
                  htmlFor="newpassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm New Password"
                  className="w-full p-3 mb-2 border-2 border-gray-300 rounded-md md:border md:border-gray-200 sm:border sm:border-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmpassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm New Password"
                  className="w-full p-3 mb-2 border-2 border-gray-300 rounded-md md:border md:border-gray-200 sm:border sm:border-gray-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePasswordForm;
