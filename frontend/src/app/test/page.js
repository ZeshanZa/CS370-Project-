"use client"

import React, { useEffect, useState } from 'react'
import SignInPageComponent2 from "../components/SignInPageComponent2"
import MainPageComponent2 from "../components/MainPageComponent2"
import MatchesPageComponent from "../components/MatchesPageComponent"
import SignInPageComponent from "../components/SignInPageComponent"
import MainPageComponent from "../components/MainPageComponent"
import ChangePasswordComponent from "../components/ChangePasswordComponent"
import UpdateProfilePageComponent from "../components/UpdateProfilePageComponent"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import FriendComponent from "../components/FriendComponent"
import axios from 'axios';

import data from './languages_data.json' assert { type: 'json' };
import Layout from '../Layouts/Layout'

const categories = ['Exp', 'DB', 'Lang', 'Pers'];

function Page() {

    const [profile, setProfile] = useState({
        user_id: null,
    });

    useEffect(() => {
        const fetchProfileData = async () => { //Artem I believe for your drawer stuff you were showing you can copy and paste this into it 
            const token = localStorage.getItem('access_token');
            // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';
            try {
                // http://3.91.27.166:8000/profile/
                const response = await axios.get('https://econnectbackend.click:8000/profile/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setProfile({
                    user_id: response.data.user || '',
                });
                console.log('Fetched user_id:', response.data.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    // this is for new implementation
    const [skillsLooking, setSkillsLooking] = useState({ Exp: [], DB: [], Lang: [], Pers: [] })
    const [skillsHave, setSkillsHave] = useState({ Exp: [], DB: [], Lang: [], Pers: [] })
    // const [skillsLooking, setSkillsLooking] = useState([])
    // const [skillsHave, setSkillsHave] = useState([])

    // const [addLooking, setAddLooking] = useState('')
    // const [addHave, setAddHave] = useState('')

    const [selectedSkill, setSelectedSkill] = useState({ Exp: '', DB: '', Lang: '', Pers: '' });
    // const [addLooking, setAddLooking] = useState({ Exp: '', DB: '', Lang: '', Pers: '' })
    // const [addHave, setAddHave] = useState({ Exp: '', DB: '', Lang: '', Pers: '' })
    const [MasterSkills, setMasterSkills] = useState({ Exp: [], DB: [], Lang: [], Pers: [] })

    useEffect(() => {
        fetch('https://econnectbackend.click:8000/masterskills/')
            .then(response => response.json())
            .then(data => setMasterSkills(data))
            .catch(error => console.error('Failed to load skills:', error));
    }, []);



    // const user_id = 10;
    // Fetch user's skills from the backend
    useEffect(() => {
        const fetchUserSkills = async () => {
            try {
                // http://3.91.27.166:8000/skills/${user_id}/get-complete-skills/
                const response = await axios.get(`https://econnectbackend.click:8000/skills/${profile.user_id}/get-complete-skills/`);
                const { acquired, search } = response.data;
                setSkillsLooking(search);
                setSkillsHave(acquired);
            } catch (error) {
                console.error('Error fetching user skills:', error);
            }
        };

        fetchUserSkills();
    }, [profile]);

    // fetch specific user arrays
    // useEffect(() => {
    //   setSkillsLooking(['Java', 'Python', 'CSS'])
    //   setSkillsHave(['OCaml', 'R', 'HTML'])
    // }, [])

    const handleAddSkill = (category, type) => {
        const skillToAdd = selectedSkill[category];
        if (!skillToAdd) return; // No skill selected in the autocomplete

        const currentSkills = type === 'acquired' ? skillsHave[category] : skillsLooking[category];

        // Check if the skill is already in the array
        if (currentSkills.includes(skillToAdd)) {
            console.log("Skill already exists:", skillToAdd);
            alert(`The skill '${skillToAdd}' is already in your ${type === 'acquired' ? 'Acquired' : 'Searching'} list.`);
            return; // Exit the function if the skill is already present
        }

        const newSkills = [...currentSkills, skillToAdd];
        updateSkillsOnServer(category, newSkills, type);
    };

    // const handleRemoveSkill = (category, type) => {
    //     const skillToRemove = selectedSkill[category];
    //     if (!skillToRemove) return; // No skill selected or found

    //     const newSkills = (type === 'acquired' ? skillsHave[category] : skillsLooking[category]).filter(skill => skill !== skillToRemove);
    //     updateSkillsOnServer(category, newSkills, type);
    // };


    const handleRemoveSkill = (category, type) => {
        const skillToRemove = selectedSkill[category];
        if (!skillToRemove) return; // No skill selected or found

        const currentSkills = type === 'acquired' ? skillsHave[category] : skillsLooking[category];
        const newSkills = currentSkills.filter(skill => skill !== skillToRemove);

        updateSkillsOnServer(category, newSkills, type)
            .then(() => {
                const updateFn = type === 'acquired' ? setSkillsHave : setSkillsLooking;
                updateFn(prev => ({ ...prev, [category]: newSkills }));
            })
            .catch(error => {
                console.log("Failed to update skills:", error);
                alert("Failed to update skills.");
            });
    };

    const updateSkillsOnServer = async (category, newSkills, type) => {
        const url = `https://econnectbackend.click:8000/skills/${profile.user_id}/${type}/${category}/update-skills/`;
        try {
            await axios.post(url, { new_skills: newSkills });
            // Update local state to reflect changes
            if (type === 'acquired') {
                setSkillsHave(prev => ({ ...prev, [category]: newSkills }));

            } else {
                setSkillsLooking(prev => ({ ...prev, [category]: newSkills }));
            }
            console.log(`Updated ${type} skills for ${category}:`, newSkills);
        } catch (error) {
            console.error('Error updating skills:', error);
        }
    };

    // const updateSkillsOnServer = async (category, newSkills, type) => {
    //   const url = `http://127.0.0.1:8000/skills/${user_id}/${type}/${category}/update-skills/`;
    //   try {
    //       const response = await axios.post(url, { new_skills: newSkills });
    //       console.log(`Updated ${type} skills for ${category}:`, newSkills);
    //       return response;  // Return response for chaining
    //   } catch (error) {
    //       console.error('Error updating skills:', error);
    //       throw error;  // Rethrow to handle it in calling function
    //   }
    // };



    console.log(data);
    function json2array(json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key].title);
        });
        return result;
    }
    const inputskills = json2array(data)

    /*return(
      <Layout>
        <div className='w-full h-[100dvh]'>
          Test here
        </div>
      </Layout>
    )*/

    const DisplaySkills = ({ title, skillsDict }) => {
        return (
            <div className="flex flex-col w-full md:w-1/2 p-4">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <div className="flex flex-wrap">
                    {Object.entries(skillsDict).map(([category, skills]) => (
                        <div key={category} className="flex flex-col w-full md:w-1/2 p-2">
                            <h3 className="font-semibold">{category}</h3>
                            <ul className="list-none">
                                {skills.map(skill => (
                                    <li key={skill} className="bg-gray-200 rounded p-1 my-1">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        limit: 10,
      });


    return (
        <div>
            <div className="flex flex-wrap justify-center w-full">
                <DisplaySkills title="Acquired Skills" skillsDict={skillsHave} />
                <DisplaySkills title="Skills I'm Looking For" skillsDict={skillsLooking} />
            </div>

            {categories.map(category => (
                <div key={category}>
                    <h3>{category}</h3>
                    <Autocomplete
                        options={MasterSkills[category]} // replace with actual skill options
                        renderInput={(params) => <TextField {...params} label="Select Skill" />}
                        value={selectedSkill[category]}
                        onChange={(event, newValue) => {
                            setSelectedSkill(prev => ({ ...prev, [category]: newValue }));
                        }}
                        filterOptions={filterOptions}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => { handleAddSkill(category, 'acquired'); location.reload }} color="primary">
                            Add to Acquired
                        </Button>
                        <Button onClick={() => { handleRemoveSkill(category, 'acquired'); location.reload }} color="secondary">
                            Remove from Acquired
                        </Button>
                        <Button onClick={() => { handleAddSkill(category, 'search'); location.reload }} color="primary">
                            Add to Searching
                        </Button>
                        <Button onClick={() => { handleRemoveSkill(category, 'search'); location.reload }} color="secondary">
                            Remove from Searching
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
//   return (
//     <div className='w-full h-[100dvh] items-center flex justify-center flex-col'>
//       <div className='bg-slate-200 rounded-md shadow-md p-5 flex flex-row'>
//         <div className='w-96 border-r-2 border-black items-center'>
//           <div className='relative my-2'>
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={inputskills}
//               sx={{ width: 300 }}
//               renderInput={(params) => <TextField {...params} label="skill I have" />}
//               inputValue={addHave}
//               onInputChange={(event, newInputValue) => {
//                 setAddHave(newInputValue);
//               }}
//             />
//           </div>
//           <div className='flex flex-col'>
//             <text className='my-3'> Skill to add: <span className='font-bold'>{addHave}</span> </text>
//             <button className='bg-blue-600 rounded-md p-2 text-white hover:bg-blue-800 w-max' onClick={() => {sadasd;location.reload()}}> Add skill </button>
//             <button className='bg-red-600 rounded-md p-2 text-white hover:bg-red-800 w-max mt-2' onClick={() => {sadasd;location.reload()}}> Remove skill </button>
//           </div>
//         </div>
//         <div className='w-96 border-l-2 border-black items-center pl-20'>
//           <div className='relative my-2'>
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={inputskills}
//               sx={{ width: 300 }}
//               renderInput={(params) => <TextField {...params} label="skill I want" />}
//               inputValue={addLooking}
//               onInputChange={(event, newInputValue) => {
//                 setAddLooking(newInputValue);
//               }}
//             />
//           </div>
//           <div className='flex flex-col'>
//             <text className='my-3'> Skill to add: <span className='font-bold'>{addLooking}</span> </text>
//             <button className='bg-blue-600 rounded-md p-2 text-white hover:bg-blue-800 w-max' onClick={() => location.reload()}> Add skill </button>
//             <button className='bg-red-600 rounded-md p-2 text-white hover:bg-red-800 w-max mt-2' onClick={() => {sadasd;location.reload()}}> Remove skill </button>
//           </div>
//         </div>
//       </div>
//       <div className='mt-10 bg-slate-200 rounded-md shadow-md p-4 flex flex-col'>
//         <text> Skills I have: <span className='font-bold'>{skillsHave.join(", ")}</span></text>
//         <text className='pt-1 mt-1 border-t-[1px] border-black'> Skills I am looking for: <span className='font-bold'>{skillsLooking.join(", ")}</span></text>
//       </div>
//     {/* <FriendComponent name={"Jon"} skills={["Java ", "Python ", "CSS "]} github='github/jon/me.com'/> */}
//     </div>
//   )
// }

export default Page