"use client"
import React, { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

// hook that manages/tracks state of acquired/searching and fetches data
const useSkills = (): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {
    const [skills, setSkills] = useState<any[]>([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/skills/')
        .then(response => response.json())
        .then(data => {
            setSkills(data);
        })
        .catch(error => console.error('Error fetching skills:', error));
    }, []);
  
    return [skills, setSkills];
};

function page() {

    const [skills, setSkills] = useSkills();
    const [selectedAcquiredSkills, setSelectedAcquiredSkills] = useState([]);
    const [selectedSearchingSkills, setSelectedSearchingSkills] = useState([]);
    const [isAcquiredDropdownOpen, setIsAcquiredDropdownOpen] = useState(false);
    const [isSearchingDropdownOpen, setIsSearchingDropdownOpen] = useState(false);

    // When skills data is loaded, initialize the selected skills
    useEffect(() => {
        setSelectedAcquiredSkills(skills.filter(skill => skill.acquired));
        setSelectedSearchingSkills(skills.filter(skill => skill.searching));
    }, [skills]);

    // Function to toggle skill status and update in backend with PUT request
    const toggleSkillStatus = (skill, statusType) => {
        const updatedSkill = { ...skill, [statusType]: !skill[statusType] };
        fetch(`http://127.0.0.1:8000/skills/${skill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSkill),
        })
        .then(response => response.json())
        .then(data => {
            setSkills(skills.map(s => s.id === data.id ? data : s));
            // Update selected skills
            if(statusType === 'acquired') {
            setSelectedAcquiredSkills(data[statusType] ? [...selectedAcquiredSkills, data] : selectedAcquiredSkills.filter(s => s.id !== data.id));
            } else {
            setSelectedSearchingSkills(data[statusType] ? [...selectedSearchingSkills, data] : selectedSearchingSkills.filter(s => s.id !== data.id));
            }
        })
        .catch(error => console.error('Error updating skill:', error));
    };

    // renders dropdown component for skills 
    const SkillsDropdown = ({ isOpen, statusType }) => {
        return isOpen && (
            <div tabIndex={0} onBlur={() => statusType === 'acquired' ? setIsAcquiredDropdownOpen(false) : setIsSearchingDropdownOpen(false)}
            className="absolute z-10 mt-2 w-5/8 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {skills.map(skill => (
                        <div key={skill.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" 
                            role="menuitem">
                            <label className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-5 w-5 text-blue-600" 
                                    checked={skill[statusType]}
                                    onChange={() => toggleSkillStatus(skill, statusType)}
                                />
                                <span>{skill.name}</span>
                            </label>
                        </div>
                    ))}
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
    const SkillBubbles = ({ skills }) => {
        return (
        <div className="flex flex-wrap gap-2 p-2">
            {skills.map(skill => (
            <span key={skill.id} className="flex items-center justify-center px-3 py-1 m-1 rounded-full bg-blue-500 text-white text-sm font-bold cursor-default hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110">
                {skill.name}
            </span>
            ))}
        </div>
        );
    };
  return (
    <div className='w-full h-full'>
        <div className='w-full p-2 flex flex-row justify-between bg-blue-900 text-white items-centerx'>
            <text className='w-max text-3xl'> Emory Connect </text>
            <input placeholder='Search' type='text' className='w-[100dvh] mx-80 rounded-2xl px-2' />
            <span className='mr-5'><TuneIcon /></span>
        </div>
        <div className='w-full flex flex-row'>
            <div className='w-3/12 p-2 h-[90dvh]'>
                <div className='w-full h-full bg-slate-300 rounded-lg px-4'>
                    <div className='w-full items-center justify-center flex'>
                        <div className='rounded-full bg-slate-800 items-center h-60 w-60 flex justify-center mt-10 text-white'>
                            Profile Photo
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
                        <div className='w-full mt-2 flex flex-row'>

                        </div>
                        <div className="flex justify-center space-x-4 py-2">
                        <a href="/mainpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Home</a>
                        <a href="/matches" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Matches</a>
                        <a href="/profile" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Profile</a>
                         <a href="/setpage" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Settings</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-7/12 flex flex-col h-[90dvh]' style={{marginTop:'0.5%'}}>
                <div className='w-2/12 '>
                    <div style={{marginBottom: '15%'}}>
                        <p>Full Name:</p>
                        <input type="text" className='rounded-lg border 1px solid #ccc borderRadius 4px'/>
                    </div > 
                    <div style={{marginBottom: '15%'}}> 
                        <p>Website URL:</p>
                        <input type="text" className='rounded-lg border 1px solid #ccc borderRadius 4px'/>
                    </div>
                    <div style={{marginBottom: '15%'}}>
                        <p>Major:</p>
                        <input className='rounded-lg border 1px solid #ccc borderRadius 4px' type="text"/>
                    </div>
                </div>
                <div className='w-5/12  mt-10'>
                <div style={{marginBottom: '15%'}}>
                        <button onClick={toggleAcquiredDropdown} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-blue-700">
                            Skills I Have
                        </button>
                        <SkillsDropdown isOpen={isAcquiredDropdownOpen} statusType="acquired" />
                        <SkillBubbles skills={selectedAcquiredSkills} />
                    </div>
                    <div style={{marginBottom: '15%'}}>
                        <button onClick={toggleSearchingDropdown} className="px-4 py-2 bg-yellow-500  text-white font-semibold rounded hover:bg-green-700">
                            Skills I'm Searching For
                        </button>
                        <SkillsDropdown isOpen={isSearchingDropdownOpen} statusType="searching" />
                        <SkillBubbles skills={selectedSearchingSkills} />  
                    </div>
                </div>
                <div>
                    <div className='mt-10'>
                        <p>Social Media Links</p>
                        <GitHubIcon />
                        <XIcon />
                    </div>
                </div>
            </div>
            
            <div className='w-2/12 p-2 h-[90dvh]'>
                <div className='bg-slate-200 h-full rounded-lg'>
                    <div className='w-full text-xl font-bold bg-slate-600 rounded-t-lg p-3'>
                        Need more skills?
                    </div>
                    <div className='w-full'>
                        <div className='w-full flex flex-row border-b-2 border-gray-400 p-2'>
                            <div className='flex flex-col'>
                                <text className='text-xl font-bold'>Leetcode</text>
                                <text className='break-words font-light'> Leetcode is an online platform for... </text>
                            </div>
                        </div>
                        <div className='w-full flex flex-col border-b-2 border-gray-400 p-2'>
                            <text className='text-xl font-bold'>You matched!</text>
                            <text className='font-light'>Your skills were a match for:</text>
                            <text className='underline'>ClosedAI - TalkGPT</text>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
    
    
    )
}

export default page