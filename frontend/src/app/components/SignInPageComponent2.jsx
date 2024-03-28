"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SingInPageComponent = () => {
  const [formType, setFormType] = useState('signin'); // 'signin' or 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter(); // Ensure correct import: import { useRouter } from 'next/router';

  const toggleFormType = () => {
    setFormType(formType === 'signin' ? 'signup' : 'signin');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload based on form type because the django form we have has diff perameters
    let payload;
    if (formType === 'signup') {
      payload = { username, email, password1: password, password2: confirmPassword };
    } else {
      // Adjusted for signin to include username
      payload = { username, email, password };
    }

    // Determine the URL endpoint based on form type i made a private varible just text me and ill tell you how 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${formType === 'signup' ? 'register' : 'login'}/`;

    try {
      // Send a POST request to the backend with axios
      const response = await axios.post(url, payload);

      // Output for debugging
      console.log(`${formType} successful`, response.data);

      // Redirect user after successful operation
      router.push('/mainpage'); // Adjust this to your needs
    } catch (error) {
      console.error(`${formType} error`, error.response?.data || error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-900 to-black'>
        <div className='flex flex-row justify-center items-center bg-white bg-opacity-10 rounded-md p-4'>
            <div className='h-full flex flex-col mr-4 text-white'>
                <text className='text-3xl font-bold font-sans mb-4 w-96'> Welcome to <span className='text-blue-500'>Emory</span><span className='text-yellow-500'>Connect</span> </text>
                <text className='w-96 text-md font-light'> A place where computer science majors connect to collaborate </text>
            </div>
            <div className='p-10 items-center text-center border-l-2 border-yellow-500'>
                <h2 className='text-white text-xl'>{formType === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                <button onClick={toggleFormType} style={btnStyle}>
                    Switch to {formType === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
                <form onSubmit={handleFormSubmit} style={formStyle}>
                    {/* Adjusted to show username input for both signin and signup I screwed up earlier and made them same */}
                    <input
                    style={inputStyle}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                    style={inputStyle}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    style={inputStyle}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {formType === 'signup' && (
                    <input
                        style={inputStyle}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    )}
                    <button type="submit" style={btnStyle}>
                    {formType === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

const btnStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  margin: '10px 0 20px 0', // Adjusted for better spacing
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#2256B7',
  color: '#fff',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column', // Changed for vertical layout
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  width: 'calc(100% - 20px)', // Adjusted for padding
  boxSizing: 'border-box',
  border: '1px solid blue',
};

export default SingInPageComponent;
