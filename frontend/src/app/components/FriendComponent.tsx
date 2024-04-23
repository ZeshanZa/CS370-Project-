import React from 'react'
import axios from 'axios'; 

type Props = {
    name: string;
    skills: any;
    github: string;
  }


  
function FriendComponent({name, skills, github} : Props) {
  const token = localStorage.getItem('access_token');

  const fetchUsername = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-username/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const { username } = response.data;
        console.log('Username:', username);
        return username;  // You can use this username in your application
    } catch (error) {
        console.error('Error fetching username:', error);
        return null;
    }
  };

  const handleRemoveFriend = async (friend_username) => {
    const self_username = await fetchUsername(); 
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/friendsList/removeFriend/${self_username}/${friend_username}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        alert(response.data.message);
    } catch (error) {
        alert('Failed to remove friend: ' + error.response.data.error);
    }
};

  return (
    <div className='flex flex-col bg-slate-200 rounded-md p-2 items-center justify-center w-min mx-2 my-4'>
        <text> {name} </text>
        <text> {skills} </text>
        <text> {github} </text>
        <div>
          <button onClick={() => handleRemoveFriend(name)} className='text-xs mt-4 p-1.5 bg-red-400 border rounded-lg '>Remove friend</button>
        </div>
    </div>
  )
}

export default FriendComponent