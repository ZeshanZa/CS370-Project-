'use client' 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Layout from '../Layouts/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

// install: 
// npm i --save @fortawesome/react-fontawesome@latest
// npm i --save @fortawesome/free-regular-svg-icons  
// npm i --save @fortawesome/free-solid-svg-icons  

interface SearchResult {
    id: number;
    name: string;
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [friendRequests, setFriendRequests] = useState([]); 
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        setToken(localStorage.getItem("access_token"));
    }, []);
/*
    const profiles = matches.map(match => ({
        id: match.sender_id, // Assuming 'sender_id' is the field returned by your API
        name: match.sender, // Assuming 'sender' is the field returned by your API
        skills: ["Python", "Django", "JavaScript"], // Temporary skills, replace with actual data if available
        interests: ["Web Development", "Machine Learning"], // Temporary interests, replace with actual data if available
        imageUrl: "https://via.placeholder.com/150" // Temporary image URL, replace with actual data if available
      }));
      */


    useEffect(() => {
        setIsLoading(true);
        
        axios.get('https://ecsconnectbackend.com:8000/friendsList/incomingPendingRequests/', { // Ensure the endpoint matches your Django URL
          headers: { 'Authorization': `Token ${token}` }
        })
        .then(response => {
          setFriendRequests(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
        });
      }, [token]);

    const friend_requests = friendRequests.map((request, index) => ({
        id: index + 1,
        sender: request.sender, 
    }
    ));

    const fetchUsername = async () => {
        try {
            const response = await axios.get('https://ecsconnectbackend.com:8000/get-username/', {
              headers: { 'Authorization': `Token ${token}` }
            });
            const { username } = response.data;
            return username;  // You can use this username in your application
        } catch (error) {
            console.error('Error fetching username:', error);
            return null;
        }
      };

    const sendRequest = async (receiver) => {
        // Retrieve the token from local storage or state management
        const sender = await fetchUsername(); 
        if (!token) {
            console.error('No access token available.');
            return;
          }
      
        if (!sender) {
            console.error('Sender username not available.');
            return;
        }
        console.log(sender); 
        console.log(receiver); 
        fetch(`https://ecsconnectbackend.com:8000/friendsList/sendFriendRequest/${sender}/${receiver}/`, {
                method: 'POST', 
                headers: {
                    // Include the token in your headers
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                console.log(data);
                alert(`Friend request sent to: ${receiver}`);
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Error sending match request');
              });
            };
          
    useEffect(() => {
        if (token) {
            const fetchUsernames = async () => {
                try {
                    const response = await axios.get('https://ecsconnectbackend.com:8000/user-list/');
                    setUsernames(response.data);
                    setIsLoading(false);
                } catch (err: any) {
                    setError(err.message);
                    setIsLoading(false);
                }
            };
            fetchUsernames();
        }
    }, [token]);

    const acceptFriend = async (username) => {
        if (!token) {
          console.error('No access token available.');
          return;
        }
    
        try {
          const response = await fetch(`https://ecsconnectbackend.com:8000/friendsList/acceptFriendRequest/${username}/`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log(result);
          alert(`Friend request with ${username} accepted.`);
          if (typeof window !== "undefined") {
            window.location.reload();
        }
        } catch (error) {
          console.error('Error:', error);
          alert('Error acceptingg match request');
        }
      };

      const declineFriendRequest = async (username) => {
        if (!token) {
          console.error('No access token available.');
          return;
        }
    
        try {
          const response = await fetch(`https://ecsconnectbackend.com:8000/friendsList/rejectFriendRequest/${username}/`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log(result);
          alert(`Friend request with ${username} declined.`);
          if (typeof window !== "undefined") {
            window.location.reload();
        }
        } catch (error) {
          console.error('Error:', error);
          alert('Error declining friend request');
        }
      };

    const mockResults: SearchResult[] = usernames.map((username, index) => ({
        id: index + 1,
        name: username,
    }));

    const handleSearch = (query: string) => {
        const filteredResults = mockResults.filter(result =>
            result.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(value);
    };

    const handleResultClick = (result: SearchResult) => {
        console.log('Clicked:', result.name);
        // Additional logic for selecting a result
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (!event.target) return;
        const target = event.target as HTMLElement;
        const searchContainer = document.getElementById('search-container');
        if (searchContainer && !searchContainer.contains(target)) {
            setSearchQuery('');
            setSearchResults([]);
            if (typeof window !== "undefined") {
                window.location.reload();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);


    // make friend requests a fixed size and have a scroll bar
    return (
        <Layout>
            <div className='flex w-full h-full'>
                <div id="search-container" className="relative mr-12">
                    <input
                        id="searchbox"
                        type="text"
                        placeholder="Search friends"
                        className="px-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    {searchQuery && (
                        <ul className="absolute z-10 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg">
                            {searchResults.map((result) => (
                                <li key={result.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                                    <span onClick={() => handleResultClick(result)}>
                                        {result.name}
                                    </span>
                                    <button onClick={() => sendRequest(result.name)}>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="p-4 flex flex-col border w-4/12 border-gray-300 rounded-md">
                    <h1 className='flex justify-center font-sans font-bold'>Friend Requests</h1>
                    {friend_requests.map(request => (
                    <div className='flex flex-row justify-between' key={request.id}>
                        <div style={{ flex: '0 0 auto', width: '50px', height: '50px', overflow: 'hidden' }}>
                            <img src="./pfp.jpg" alt='Profile picture' style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-center'>
                                {request.sender} wants to be friends
                            </p>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <button onClick={() => acceptFriend(request.sender)} className='mr-4'><FontAwesomeIcon icon={faCheck} /></button>
                            <button onClick={() => declineFriendRequest(request.sender)}><FontAwesomeIcon icon={faX} fontSize={'85%'} /></button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default SearchBar;
