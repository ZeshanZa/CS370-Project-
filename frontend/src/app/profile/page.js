"use client";

import { Box, Divider, Drawer, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../Layouts/Layout";

function UpdateProfilePageComponent() {
  const [ProfileDrawer, setProfileDrawer] = useState(false);
  const [NotificationsDrawer, setNotificationsDrawer] = useState(false);
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const [skillsLooking, setSkillsLooking] = useState({
    Exp: [],
    DB: [],
    Lang: [],
    Pers: [],
  });
  const [skillsHave, setSkillsHave] = useState({
    Exp: [],
    DB: [],
    Lang: [],
    Pers: [],
  });

  const [profile, setProfile] = useState({
    fullName: "",
    major: "",
    githubUrl: "",
    bio: "",
    user_id: null,
  });

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/skills/${profile.user_id}/get-complete-skills/`
        );
        const { acquired, search } = response.data;
        setSkillsLooking(search);
        setSkillsHave(acquired);
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };

    if (profile.user_id) {
      fetchUserSkills();
    }
  }, [profile.user_id]);

  useEffect(() => {
    const fetchProfileData = async () => {
      //Artem I believe for your drawer stuff you were showing you can copy and paste this into it
      const token = localStorage.getItem("access_token");
      // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setProfile({
          fullName: response.data.full_name || "",
          major: response.data.major || "",
          githubUrl: response.data.github_url || "",
          bio: response.data.bio || "",
          user_id: response.data.user || "",
        });
        console.log("Fetched user_id:", response.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    const userId = response.data.pk; // For this for some reason I had to make the assumption for userid for testing in django the rest framework atores as the pk value which is unique for each user I believe

    const payload = {
      user: userId, // Include the user ID in the payload it needs it to make chnages
      full_name: profile.fullName,
      major: profile.major,
      github_url: profile.githubUrl,
      bio: profile.bio,
    };
    if (submitted) {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
          JSON.stringify(payload),
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          },
          alert("Profile updated successfully"),
          setSubmitted(false)
        );
      } catch (error) {
        console.error(
          "Error updating profile:",
          error.response ? error.response.data : error
        );
      }
    }
  };

  const DisplaySkills = ({ title, skillsDict }) => {
    return (
      <div className="flex flex-col w-full md:w-1/2 p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <div className="flex flex-wrap">
          {Object.entries(skillsDict).map(([category, skills]) => (
            <div key={category} className="flex flex-col w-full md:w-1/2 p-2">
              <h3 className="font-semibold">{category}</h3>
              <ul className="list-none">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded p-1 my-3 flex ring-1 ring-gray-500/50"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {}
      <Layout>
        <div className="flex">
          <div className="flex-col">
            <div className="flex flex-col md:flex-row w-full max-w-4xl">
              <DisplaySkills title="Your Skills" skillsDict={skillsHave} />
              <DisplaySkills
                title="Skills You're Looking For"
                skillsDict={skillsLooking}
              />
            </div>
            <button
              type="btton"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-4 rounded"
              onClick={() => {
                router.push("/skills");
              }}
            >
              Edit Skills
            </button>
          </div>

          <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 ml-6 w-full max-w-lg">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  label="Full Name"
                  type="text"
                  name="fullName"
                  variant="outlined"
                  value={profile.fullName}
                  onChange={handleChange}
                  fullWidth
                  disabled={!isEditable}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Intended Major"
                  type="text"
                  name="major"
                  variant="outlined"
                  value={profile.major}
                  onChange={handleChange}
                  fullWidth
                  disabled={!isEditable}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="GitHub URL"
                  type="text"
                  name="githubUrl"
                  variant="outlined"
                  value={profile.githubUrl}
                  onChange={handleChange}
                  fullWidth
                  disabled={!isEditable}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Bio"
                  name="bio"
                  variant="outlined"
                  value={profile.bio}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  disabled={!isEditable}
                />
              </div>
              <button
                onClick={toggleEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                {isEditable ? "Cancel" : "Edit"}
              </button>
              {isEditable && (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-4 rounded"
                  onClick={setSubmitted}
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UpdateProfilePageComponent;

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
