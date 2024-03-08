"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
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
    <div style={containerStyle}>
      <h2>{formType === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
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
  );
};


const containerStyle = {
  maxWidth: '450px',
  height: 'auto', // Adjusted for dynamic content
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

export default AuthForm;
