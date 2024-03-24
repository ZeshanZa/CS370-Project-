"use client"
import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
   

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');
      return;
    }
  
    const token = localStorage.getItem('access_token'); // Ensure this matches how you store the token
    console.log(`Token being sent: '${token}'`); // Debugging only

    const headers = {
      'Authorization': `Token ${token}`, // Adjusted to match the required format
    };
  
    const payload = {
      new_password1: newPassword,
      new_password2: confirmNewPassword,
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/password/change/', payload, { headers });
      console.log('Password changed successfully', response.data);
      alert('Password changed successfully');
      // Optional: Redirect the user or force a logout here
    } catch (error) {
      console.error('Error changing password:', error.response?.data || error);
      alert('Error changing password');
    }
  };
  
  
  
  
  

  return (
    <div className="container mx-auto px-4 mb-28">
      <div className="flex items-center justify-center ">
        <div className='rounded-full bg-slate-800 items-center h-60 w-60 flex justify-center text-white'>
          Profile Photo
        </div>
      </div>
      <div className="text-center">
        <h4 className="mb-">First and Last Name</h4>
        <p className="text-gray-600">
          <span className="bg-gray-700 text-white py-1 px-3 rounded-full text-xs">Location</span>
        </p>
      </div>
      
      <div className="mt-5">
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label htmlFor="newpassword" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input onChange={(e) => setNewPassword(e.target.value)} type="password" id="newpassword" placeholder="New Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
            <input onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" id="confirmpassword" placeholder="Confirm New Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Changes
          </button>
        </form>
      </div>
      
      <div className="fixed inset-x-0 bottom-0 bg-gray-100">
        <div className="flex justify-center space-x-4 py-2">
          <a href="/mainpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Home</a>
          <a href="/matches" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Matches</a>
          <a href="/profile" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Profile</a>
          <a href="/setpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Settings</a>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
