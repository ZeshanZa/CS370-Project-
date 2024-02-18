import React, { useState } from 'react';

const Signin = () => {
  const [isSignIn, setIsSignIn] = useState(true); // State to track whether sign-in form is displayed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {// Function to toggle between sign-in and sign-up forms
    setIsSignIn(!isSignIn); 
  };

  const handleEmailChange = (e) => {// Function to handle email input change
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {// Function to handle password input change
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {// Function to handle sign-in form submission
    e.preventDefault();
    // Logic for handling sign-in submission
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={containerStyle}>
      <h2>Sign In/Sign Up</h2>
      {/* Buttons to toggle between sign-in and sign-up */}
      <button style={btnStyle} onClick={toggleForm}>
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>
      <button style={btnStyle} onClick={toggleForm}>
        {isSignIn ? 'Sign Up' : 'Sign In'}
      </button>

      {/* Conditional rendering of sign-in or sign-up form based on state */}
      <form style={formStyle} onSubmit={handleSubmit} >
        <h3>{isSignIn ? 'Sign In' : 'Sign Up'}</h3>
        {/* Input fields for email and password */}
        <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button type="submit" style={btnStyle}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

// Inline styles
const containerStyle = {// Container styles
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',// Add a border around the container
  borderRadius: '15px',
  textAlign: 'center'
};

const btnStyle = {// Button styles
  display: 'inline-block',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#2256B7',
  color: '#fff'
};

const formStyle = {
  display: 'block' // Initially display the form
};

const inputStyle = { // Input fields of email and password 
  margin: '5px 0',
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box' // Include padding and border in the width
};

export default Signin;
