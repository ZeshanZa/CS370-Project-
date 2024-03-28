"use client" //For our react version have to use this 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';
import { Box, Divider, Drawer } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Marquee from 'react-fast-marquee'

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [editingProjectId, setEditingProjectId] = useState(null); //Use state has to be set null 
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [ProfileDrawer, setProfileDrawer] = useState(false)
    const [NotificationsDrawer, setNotificationsDrawer] = useState(false)

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setProjects(response.data); // Projects returned 
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);
    const handleAddProjectSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');//Maybe we should find another way to store token 
        const projectData = {
            title: newProjectTitle,
            description: newProjectDescription,
        };
    
        try {
            await axios.post('http://127.0.0.1:8000/projects/create/', projectData, { //I decided to remove local variable since some of yall are havin issues so just put URL instead 
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setNewProjectTitle('');
            setNewProjectDescription('');
            setShowAddProjectForm(false); // Hide the form upon successful submission
            window.location.reload(); // Force reload the page for some reason it wont reload when I fetch them but this way works same for editing
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleDeleteProject = async (projectId) => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.delete(`http://127.0.0.1:8000/projects/${projectId}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            // Filter out the deleted project from the state
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

                // Start editing a project
        const handleEditProject = (project) => {
            setEditingProjectId(project.id);
            setEditTitle(project.title);
            setEditDescription(project.description);
            setShowAddProjectForm(true); // Assuming you use the same form for add/edit, show it.
        };

        // Cancel editing
        const handleCancelEdit = () => {
            setEditingProjectId(null);
            setEditTitle('');
            setEditDescription('');
            setShowAddProjectForm(false); // Hide the form.
        };

        // Submit edited project
        const handleEditSubmit = async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('access_token');
            try {
                await axios.put(`http://127.0.0.1:8000/projects/${editingProjectId}/`, {
                    title: editTitle,
                    description: editDescription,
                }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                handleCancelEdit(); // Reset editing state
                window.location.reload();
            } catch (error) {
                console.error('Error updating project:', error);
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
                    <button className='bg-gray-300 py-1 w-full rounded-md text-slate-700 hover:bg-gray-500 hover:text-slate-200'> Sign Out </button>
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
        <Divider />
        <div className='p-3 text-slate-600'>
            <Marquee>
                <div className='mr-20'/>
                <text className='text-xl mx-8 font-semibold'> Most looked for languages today: </text>
                <text className='text-xl mx-8'> React </text>
                <text className='text-xl mx-8'> Python </text>
                <text className='text-xl mx-8'> Java </text>
                <text className='text-xl mx-8'> C </text>
                <text className='text-xl mx-8'> C++ </text>
                <text className='text-xl mx-8'> CSS </text>
                <text className='text-xl mx-8'> HTML </text>
                <text className='text-xl mx-8'> JavaScript </text>
                <text className='text-xl mx-8'> SQL </text>
                <text className='text-xl mx-8'> PHP </text>
                <text className='text-xl mx-8'> R </text>
                <text className='text-xl mx-8'> GO </text>
                <text className='text-xl mx-8'> Typescript </text>
                <text className='text-xl mx-8'> Swift </text>
                <text className='text-xl mx-8'> C# </text>
                <text className='text-xl mx-8'> Kotlin </text>
                <text className='text-xl mx-8'> Unity </text>
                <text className='text-xl mx-8'> React-Native </text>
                <text className='text-xl mx-8'> Rust </text>
                <text className='text-xl mx-8'> Assembly </text>
                <text className='text-xl mx-8'> Matlab </text>
                <text className='text-xl mx-8'> Delphi </text>
                <text className='text-xl mx-8'> Scala </text>
                <text className='text-xl mx-8'> React </text>
                <text className='text-xl mx-8'> Python </text>
                <text className='text-xl mx-8'> Java </text>
                <text className='text-xl mx-8'> C </text>
                <text className='text-xl mx-8'> C++ </text>
                <text className='text-xl mx-8'> CSS </text>
                <text className='text-xl mx-8'> HTML </text>
                <text className='text-xl mx-8'> JavaScript </text>
                <text className='text-xl mx-8'> SQL </text>
                <text className='text-xl mx-8'> PHP </text>
                <text className='text-xl mx-8'> R </text>
                <text className='text-xl mx-8'> GO </text>
                <text className='text-xl mx-8'> Typescript </text>
                <text className='text-xl mx-8'> Swift </text>
                <text className='text-xl mx-8'> C# </text>
                <text className='text-xl mx-8'> Kotlin </text>
                <text className='text-xl mx-8'> Unity </text>
                <text className='text-xl mx-8'> React-Native </text>
                <text className='text-xl mx-8'> Rust </text>
                <text className='text-xl mx-8'> Assembly </text>
                <text className='text-xl mx-8'> Matlab </text>
                <text className='text-xl mx-8'> Delphi </text>
                <text className='text-xl mx-8'> Scala </text>
            </Marquee>
        </div>
        <Divider />
        <div className='px-5 py-6'>
            <text className='text-3xl text-slate-600'> Your Projects </text>
            <div className='w-full flex-wrap flex justify-center'>
            <div className='w-full h-full'>

            <div className='w-7/12 p-2'>
            <div className='text-right mb-4'>
         <button 
        onClick={() => setShowAddProjectForm(!showAddProjectForm)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
        {showAddProjectForm ? 'Cancel' : 'Add Project'}
    </button>
        </div>

        {showAddProjectForm && (
    <div className="mb-4 p-4 bg-white rounded shadow">
        <form onSubmit={editingProjectId ? handleEditSubmit : handleAddProjectSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={editingProjectId ? editTitle : newProjectTitle} 
                onChange={(e) => editingProjectId ? setEditTitle(e.target.value) : setNewProjectTitle(e.target.value)} 
                className="mb-2 p-2 rounded border border-gray-300 w-full"
            />
            <textarea 
                placeholder="Description" 
                value={editingProjectId ? editDescription : newProjectDescription} 
                onChange={(e) => editingProjectId ? setEditDescription(e.target.value) : setNewProjectDescription(e.target.value)} 
                className="mb-2 p-2 rounded border border-gray-300 w-full"
            ></textarea>
            <button 
                type="submit" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                {editingProjectId ? 'Update Project' : 'Submit'}
            </button>
            {editingProjectId && (
                <button 
                    onClick={handleCancelEdit} 
                    type="button" 
                    className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            )}
        </form>
    </div>
)}

        <div>
          <div className='w-full flex-wrap flex justify-center'>
          {projects.map(project => (
    <div key={project.id} className='bg-slate-300 m-3 p-2 rounded-xl flex flex-col w-5/12 relative'>
        <div className='flex flex-row justify-between font-bold text-xl'>
            <text> {project.title} </text>
            <div>
                <StarIcon />
                <text
                    onClick={() => handleEditProject(project)}
                    className="text-sm cursor-pointer underline italic mr-2"
                    style={{fontStyle: 'italic'}}
                >
                    Edit
                </text>
                <text
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-sm cursor-pointer underline italic"
                    style={{fontStyle: 'italic'}}
                >
                    Delete
                </text>
            </div>
        </div>
        <text className='font-light text-sm whitespace-pre-line break-words'> {project.description} </text>
    </div>
))}


          </div>
          <text className='underline'> Expand for more... </text> 
        </div>
      </div>
           
        </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default ProjectsPage