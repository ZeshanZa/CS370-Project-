"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TuneIcon from '@mui/icons-material/Tune';

function Page() {
    const [profile, setProfile] = useState({
        fullName: '',
        major: '',
        githubUrl: '',
        bio: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => { //Artem I believe for your drawer stuff you were showing you can copy and paste this into it 
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/profile/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setProfile({
                    fullName: response.data.full_name || '',
                    major: response.data.major || '',
                    githubUrl: response.data.github_url || '',
                    bio: response.data.bio || '',
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

            const response = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
              headers: {
                'Authorization': `Token ${token}`,
              },
            });
        
        const userId = response.data.pk; // For this for some reason I had to make the assumption for userid for testing in django the rest framework atores as the pk value which is unique for each user I believe 
    
        const payload = {
            user: userId, // Include the user ID in the payload it needs it to make chnages 
            full_name: profile.fullName,
            major: profile.major,
            github_url: profile.githubUrl,
            bio: profile.bio,
        };
    
        try {
            await axios.put('http://127.0.0.1:8000/profile/', JSON.stringify(payload), {
                headers: {
                    'Authorization': `Token ${token}`, 
                    'Content-Type': 'application/json',
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error);
        }
    };
    
    

    return (
        <div className='w-full min-h-screen bg-gray-100 p-5'>
            <div className='w-full p-4 flex flex-row justify-between bg-blue-900 text-white items-center rounded'>
                <h1 className='text-3xl'>Emory Connect</h1>
                <TuneIcon />
            </div>
            <div className='flex flex-row mt-5'>
                <div className='w-1/4 p-4 bg-white rounded shadow'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='rounded-full bg-slate-800 h-40 w-40 flex items-center justify-center text-white text-xl mb-4'>
                            Profile Photo
                        </div>
                        <h2 className='text-lg font-bold mb-2'>{profile.fullName}</h2>
                        <p className='text-md mb-1'>{profile.major}</p>
                        <a href={profile.githubUrl} className='text-sm text-blue-500 mb-2'>{profile.githubUrl}</a>
                        <p className='text-sm bg-gray-200 p-3 rounded'>{profile.bio}</p>
                        <div className="flex justify-center space-x-4 py-2">
                <a href="/mainpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Home</a>
                 <a href="/matches" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Matches</a>
                 <a href="/profile" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Profile</a>
                <a href="/setpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Settings</a>
                </div>
                    </div>
                </div>
                <div className='flex-grow p-4 ml-5 bg-white rounded shadow'>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Major</label>
                            <input type="text" name="major" value={profile.major} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">GitHub URL</label>
                            <input type="text" name="githubUrl" value={profile.githubUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                            <textarea name="bio" value={profile.bio} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
