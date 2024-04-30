'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
    username: string;
  }
  
  const AddRemovedMatchButton: React.FC<Props> = ({ username }) => {
    username = 'zeshan' 
    const username1 = 'adsf1234'
    const handleAddMatch = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/delete-match/${username}/${username1}/`; // Adjust the URL to match your actual API endpoint
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store your token in localStorage
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(`Response: ${data.message}`);
        } else {
          alert(`Error: ${data.error || 'Something went wrong'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add removed match');
      }
    };
  
    return (
      <button onClick={handleAddMatch}>
        Add to Removed Matches
      </button>
    );
  };
  
  export default AddRemovedMatchButton;