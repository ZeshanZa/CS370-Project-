"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Corrected import based on your comment I though router worked but apparently new update we have to use navigation 

const AuthForm = () => {
  const [formType, setFormType] = useState('signin'); // 'signin' or 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const toggleFormType = () => {
    setFormType(formType === 'signin' ? 'signup' : 'signin');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    let payload;
    if (formType === 'signup') {
      payload = { username, email, password1: password, password2: confirmPassword };
    } else {
      payload = { username, email, password }; // For signin
    }
  
    const url = `http://127.0.0.1:8000/api/auth/${formType === 'signup' ? 'register' : 'login'}/`;

  
    try {
      const response = await axios.post(url, payload);
  
      if (formType === 'signin') {
        // Assuming the token is returned under the key 'key' for sign-in
        const { key } = response.data;
        localStorage.setItem('access_token', key); // Storing the token correctly
        console.log(`${formType} successful`, response.data);
        router.push('/mainpage'); // Redirect after successful signin
      } else if (formType === 'signup') {
        console.log(`${formType} successful`, response.data);
        // Optionally, handle post-signup logic here, like redirecting to a sign-in page
      }
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