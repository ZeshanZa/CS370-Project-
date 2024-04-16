'use client'

import { Box, Divider, Drawer, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useRouter } from 'next/navigation'
import axios from 'axios';

function UpdateProfilePageComponent() {
    const [ProfileDrawer, setProfileDrawer] = useState(false)
    const [NotificationsDrawer, setNotificationsDrawer] = useState(false)
    const router = useRouter()

    const [profile, setProfile] = useState({
        fullName: '',
        major: '',
        githubUrl: '',
        bio: '',
        user_id: null,
    });

    useEffect(() => {
        const fetchProfileData = async () => { //Artem I believe for your drawer stuff you were showing you can copy and paste this into it 
            const token = localStorage.getItem('access_token');
            // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';
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
                    user_id: response.data.user || '',
                });
                console.log('Fetched user_id:', response.data.user);
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
        // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';

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
    <>
    <Drawer open={NotificationsDrawer} anchor='left' onClose={() => setNotificationsDrawer(false)}>
      <Box width={350}>
        <div className='h-[100dvh] p-2'>
            <div className='w-full text-xl font-bold p-3 border-b-2 border-slate-900'>
                Notifications
            </div>
            <div className='w-full'>
                <div className='w-full flex flex-row border-b-[1px] border-gray-400 p-2'>
                    <div className='w-2/3 flex flex-col'>
                        <text className='text-xl font-bold'>New message</text>
                        <text className='break-words font-light'> Hi Brian, your skills match well fo my project on the... </text>
                    </div>
                    <div className='w-1/3 flex flex-col items-center'>
                        <div className='w-16 h-16 flex justify-center items-center rounded-full text-sm'>
                            <img src='https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg'/>
                        </div>
                        <text> Selene F. </text>
                    </div>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>ClosedAI - TalkGPT</text>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>QuantumScribe: Neural Cryptography</text>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>CyberGuard: AI Security</text>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>LogicFlow: WorkFlowAI</text>
                </div>
                <div className='w-full flex flex-row border-b-[1px] border-gray-400 p-2'>
                    <div className='w-2/3 flex flex-col'>
                        <text className='text-xl font-bold'>New message</text>
                        <text className='break-words font-light'> Hey Brian, thought u and me could make a great tea... </text>
                    </div>
                    <div className='w-1/3 flex flex-col items-center'>
                        <div className='w-16 h-16 flex justify-center items-center rounded-full text-sm'>
                            <img src='https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png'/>
                        </div>
                        <text> Matt J. </text>
                    </div>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>NeuralCraft: GameAI</text>
                </div>
                <div className='w-full flex flex-col border-b-[1px] border-gray-400 p-2'>
                    <text className='text-xl font-bold'>You matched!</text>
                    <text className='font-light'>Your skills were a match for:</text>
                    <text className='underline'>CodeHive: TeamCode</text>
                </div>
            </div>
        </div>
      </Box>
    </Drawer>
    <Drawer open={ProfileDrawer} anchor='right' onClose={() => setProfileDrawer(false)}>
      <Box width={350}>
        <div className='p-2 h-[100dvh]'>   
            <div className='w-full h-full rounded-lg px-4 flex flex-col'>
                <div className='w-full items-center justify-center flex'>
                    <div className='rounded-full items-center h-60 w-60 flex justify-center mt-10 text-white'>
                        <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <text className='text-lg'>Brian S.</text>
                    <text className='text-lg'>3rd Year computer science BA</text>
                    <text className='text-sm font-light'>bsmith@emory.edu</text>
                    <div className='flex flex-row'>
                        <text> - </text>
                        <text className='text-sm'> https://briansmith.github.io </text>
                    </div>
                    <div className='whitespace-pre-line p-1 bg-slate-100 font-md rounded-lg break-words'>
                    Hello, my name is Brian, and I am a 3rd year computer science major at Emory. I enjoy making projects related to:
Artificial intelligence, Natural Language Processing, and Data Science.
                    </div>
                    <div className='w-full mt-2 flex flex-row flex-wrap justify-around text-white'>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            JavaScript
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            Python
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            R
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            Ruby
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            PascalABC
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            TypeScipt
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            HRML
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            Java
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            CSS
                        </div>
                        <div className='rounded-full bg-slate-400 p-2 m-1 items-center'>
                            Ocaml
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 py-2">
                        <a href="/mainpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Home</a>
                        <a href="/matches" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Matches</a>
                        <a href="/profile" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Profile</a>
                        <a href="/setpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Settings</a>
                    </div>
                </div>
                <div className='flex flex-grow items-center justify-center'>
                    <button className='bg-gray-300 py-1 w-full rounded-md text-slate-700 hover:bg-gray-500 hover:text-slate-200' onClick={() => router.push('/')}> Sign Out </button>
                </div>
            </div>
        </div>
      </Box>
    </Drawer>
    <div className='w-[100dvw] h-[100dvh] overflow-x-hidden'>
        <div className='flex flex-row justify-between px-5 py-6 items-center'>
            <text className='relative text-3xl'> <span className='text-blue-600'>Emory</span> <span className='text-blue-400'>Connect</span> </text>
            <div className='flex flex-row text-slate-600 items-center'>
            <div className='cursor-pointer' onClick={() => setNotificationsDrawer(true)}><NotificationsNoneOutlinedIcon style={{width: 30, height: 30}}/></div>
                <div className='mx-2'/>
                <div className='cursor-pointer' onClick={() => setProfileDrawer(true)}><AccountCircleOutlinedIcon style={{width: 30, height: 30}}/></div>
            </div>
        </div>
        <Divider className='relative mb-5'/>
        <text className='ml-5 text-3xl text-slate-800 font-semibold'> Profile </text>
        <div className='ml-12 w-32 border-4 border-blue-400 rounded-full my-2'></div>
        <div className='items-center flex justify-center h-4/5 w-full'>
            <div className='bg-gray-100 p-3 w-full max-w-[400px] text-center rounded-md'>
                <div className='w-full items-center justify-center flex'>
                    <div className='rounded-full items-center h-60 w-60 flex justify-center mt-10 text-white'>
                        <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'/>
                    </div>
                </div>
                <div className='my-10'><text className='text-xl my-10 font-semibold'>{profile.fullName}</text></div>
            </div>
            <div className='bg-slate-800 h-4/5 mx-16 w-[1px]'></div>
            <div className='border-2 border-slate-200 rounded-2xl px-10 py-6 flex flex-col w-full max-w-[500px]'>
                <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                    <text className='text-l font-semibold mb-1 mt-4' > Full name </text>
                    <span className='w-4/5'><TextField type="text" name="fullName" value={profile.fullName} onChange={handleChange}size='small' placeholder='name...' fullWidth/></span>
                    <text className='text-l font-semibold mb-1 mt-4'> Intended Major </text>
                    <span className='w-4/5'><TextField type="text" name="major" value={profile.major} onChange={handleChange} fullWidth/></span>
                    <text className='text-l font-semibold mb-1 mt-4'> Github URL </text>
                    <span className='w-4/5 mb-4'><TextField   
                            type="text"
                            name="githubUrl"
                            value={profile.githubUrl || ''} // Ensure the value is always defined
                            onChange={handleChange}
                            fullWidth
                            minRows={3}
                            placeholder='something about you...'/>
                    </span>
                    <text className='text-l font-semibold mb-1 mt-4'> Bio </text>
                    <span className='w-4/5'><TextField name="bio" value={profile.bio} onChange={handleChange} fullWidth multiline minRows={3}/></span>
                    <div>
                        <span className=''><button className='bg-blue-400 text-white w-full max-w-[80px] rounded-md mt-8 p-1 hover:bg-blue-600 mr-4'> Edit </button></span>
                        <span className=''><button type="submit" className='bg-blue-400 text-white w-full max-w-[200px] rounded-md mt-8 p-1 hover:bg-blue-600'> Save Changes </button></span>
                    </div>
               </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateProfilePageComponent


/*

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TuneIcon from '@mui/icons-material/Tune';
import Layout from '../Layouts/Layout';


// hook that manages/tracks state of acquired/searching and fetches data

const useSkills = (user_id) => {
    const [userSkills, setUserSkills] = useState([]);

    useEffect(() => {
        if (user_id) {
            fetch(`http://127.0.0.1:8000/user_skills/?users=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched user skills:', data);
                    setUserSkills(data)
                })
                .catch(error => console.error('Error fetching user skills:', error));
        }
    }, [user_id]);

    return [userSkills, setUserSkills];
};



function Page() {

    

    const [profile, setProfile] = useState({
        fullName: '',
        major: '',
        githubUrl: '',
        bio: '',
        user_id: null,
    });

    useEffect(() => {
        const fetchProfileData = async () => { //Artem I believe for your drawer stuff you were showing you can copy and paste this into it 
            const token = localStorage.getItem('access_token');
            // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';
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
                    user_id: response.data.user || '',
                });
                console.log('Fetched user_id:', response.data.user);
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
        // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';

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
    
    const [allSkills, setAllSkills] = useState([]);
    const [userSkills, setUserSkills] = useSkills(profile.user_id);
    console.log('Passed user_id to useSkills:', profile.user_id);
    const [selectedAcquiredSkills, setSelectedAcquiredSkills] = useState([]);
    const [selectedSearchingSkills, setSelectedSearchingSkills] = useState([]);
    const [isAcquiredDropdownOpen, setIsAcquiredDropdownOpen] = useState(false);
    const [isSearchingDropdownOpen, setIsSearchingDropdownOpen] = useState(false);

    // When skills data is loaded, initialize the selected skills
    useEffect(() => {
        setSelectedAcquiredSkills(userSkills.filter(userSkill => userSkill.acquiring && userSkill.user === profile.user_id));
        setSelectedSearchingSkills(userSkills.filter(userSkill => userSkill.searching && userSkill.user === profile.user_id));
    }, [userSkills, profile.user_id]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/skills/') 
            .then(response => response.json())
            .then(data => {
                setAllSkills(data); 
            })
            .catch(error => console.error('Error fetching all skills:', error));
    }, []);

    const toggleSkillStatus = (skill, statusType) => {
        // Find if the skill already exists in the user's skills
        const existingUserSkill = userSkills.find(us => us.skill.id === skill.id);
    
        if (existingUserSkill) {
            // Update existing skill
            const updatedUserSkill = {
                id: existingUserSkill.id,
                user: profile.user_id,  
                skill_id: skill.id,  
                acquiring: statusType === 'acquiring' ? !existingUserSkill.acquiring : existingUserSkill.acquiring,
                searching: statusType === 'searching' ? !existingUserSkill.searching : existingUserSkill.searching
            };
    
            fetch(`http://127.0.0.1:8000/user_skills/${existingUserSkill.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserSkill),
            })
            .then(response => response.json())
            .then(data => {
                // Update the state with the modified skill
                setUserSkills(prevUserSkills => prevUserSkills.map(us => us.id === data.id ? data : us));
            })
            .catch(error => console.error('Error updating user skill:', error));
        } else {
            // Add new skill with the selected status
            const newUserSkill = {
                user: profile.user_id, 
                skill_id: skill.id,
                acquiring: statusType === 'acquiring',
                searching: statusType === 'searching'
            };
    
            fetch(`http://127.0.0.1:8000/user_skills/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserSkill),
            })
            .then(response => response.json())
            .then(data => {
                // Add the new skill to the state
                setUserSkills(prevUserSkills => [...prevUserSkills, data]);
            })
            .catch(error => console.error('Error adding new user skill:', error));
        }
    };

    // renders dropdown component for skills 
    const SkillsDropdown = ({ isOpen, statusType, allSkills, userSkills, toggleSkillStatus }) => {
        return isOpen && (
            <div className="absolute z-10 mt-2 w-5/8 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {allSkills.map(skill => {
                        // Check if the user has marked this skill as acquired/searching
                        const isSkillSelected = userSkills.some(userSkill => userSkill.skill.id === skill.id && userSkill[statusType]);
    
                        return (
                            <div key={skill.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                <label className="flex items-center space-x-3">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox h-5 w-5 text-blue-600" 
                                        checked={isSkillSelected}
                                        onChange={() => toggleSkillStatus(skill, statusType)}
                                    />
                                    <span>{skill.name}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // manages state of drops downs for acquired/searching dropdowns
    const toggleAcquiredDropdown = () => {
        setIsAcquiredDropdownOpen(!isAcquiredDropdownOpen);
    };

    const toggleSearchingDropdown = () => {
        setIsSearchingDropdownOpen(!isSearchingDropdownOpen);
    };

  // renders skill bubbles depending on whether acquired/searching is true
    const SkillBubbles = ({ statusType }) => {
        let skillsToDisplay = [];
        if (statusType === 'acquiring') {
            skillsToDisplay = selectedAcquiredSkills;
        } else if (statusType === 'searching') {
            skillsToDisplay = selectedSearchingSkills;
        }
        console.log('Rendering skills with keys:', skillsToDisplay.map(us => us.skill.id));
        return (
            <div className="flex flex-wrap gap-2 p-2">
                {skillsToDisplay.map(userSkill => (
                    <span key={userSkill.skill.id} className="flex items-center justify-center px-3 py-1 m-1 rounded-full bg-blue-500 text-white text-sm font-bold cursor-default hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110">
                        {userSkill.skill.name}
                    </span>
                ))}
            </div>
        );
    };

    return (
        /*<div className='w-full min-h-screen bg-gray-100 p-5'>
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
                        <button onClick={toggleAcquiredDropdown} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-700">
                            Skills I Have
                        </button>
                        <SkillsDropdown isOpen={isAcquiredDropdownOpen} statusType="acquiring" allSkills={allSkills} userSkills={userSkills} toggleSkillStatus={toggleSkillStatus} />
                        <SkillBubbles statusType="acquiring" />
                        <button onClick={toggleSearchingDropdown} className="px-4 py-2 bg-yellow-500  text-white font-semibold rounded hover:bg-green-700">
                            Skills I'm Searching For
                        </button>
                        
                        <SkillsDropdown isOpen={isSearchingDropdownOpen} statusType="searching" allSkills={allSkills} userSkills={userSkills} toggleSkillStatus={toggleSkillStatus} />
                        <SkillBubbles statusType="searching" />
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
        </div>*/

        /*
        <Layout>
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
                        <button onClick={toggleAcquiredDropdown} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-700">
                            Skills I Have
                        </button>
                        <SkillsDropdown isOpen={isAcquiredDropdownOpen} statusType="acquiring" allSkills={allSkills} userSkills={userSkills} toggleSkillStatus={toggleSkillStatus} />
                        <SkillBubbles statusType="acquiring" />
                        <button onClick={toggleSearchingDropdown} className="px-4 py-2 bg-yellow-500  text-white font-semibold rounded hover:bg-green-700">
                            Skills Im Searching For
                        </button>
                        
                        <SkillsDropdown isOpen={isSearchingDropdownOpen} statusType="searching" allSkills={allSkills} userSkills={userSkills} toggleSkillStatus={toggleSkillStatus} />
                        <SkillBubbles statusType="searching" />
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
        </Layout>
    );
}

export default Page;
*/
