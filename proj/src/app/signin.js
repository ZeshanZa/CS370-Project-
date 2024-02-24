// pages/signin.js from the jsx earlier 
"use client"; //had to use this to import react with useState
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Signin = () => {
  const [isSignIn, setIsSignIn] = useState(true); // State to track whether sign-in form is displayed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Use useRouter hook for navigation

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#7393B3'; // Replace with your desired color
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);
 
  
  
  
  const toggleForm = () => { // Function to toggle between sign-in and sign-up forms
    setIsSignIn(!isSignIn);
  };

  const handleEmailChange = (e) => { // Function to handle email input change
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => { // Function to handle password input change
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    
  };

  return (
    
    <div style={containerStyle}>
      <h2>Sign In / Sign Up</h2>
      <button style={btnStyle} onClick={toggleForm}>
        {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
      </button>

      <form style={formStyle} onSubmit={handleSubmit}>
        <h3>{isSignIn ? 'Sign In' : 'Sign Up'}</h3>
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" style={btnStyle}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
    
  );
};

// Inline styles

const containerStyle = {
  maxWidth: '450px',
  height: '450px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '15px',
  textAlign: 'center',
  backgroundColor: 'grey',
};

const btnStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  margin: '30px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#2256B7',
  color: '#fff',
};

const formStyle = {
  display: 'block',
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid blue',
};


export default Signin;
