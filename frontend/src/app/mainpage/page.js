"use client" //For our react version have to use this 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [editingProjectId, setEditingProjectId] = useState(null); //Use state has to be set null 
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    
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
    <div className='w-full h-full'>
        <div className='w-full p-2 flex flex-row justify-between bg-blue-900 text-white items-centerx'>
            <text className='w-max text-3xl'> Emory Connect </text>
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
                            <div className='rounded-full bg-slate-400 p-2 mx-1 items-center'>
                                JavaScript
                            </div>
                            <div className='rounded-full bg-slate-400 p-2 mx-1 items-center'>
                                Python
                            </div>
                            <div className='rounded-full bg-slate-400 p-2 mx-1 items-center'>
                                R
                            </div>
                            <div className='rounded-full bg-slate-400 p-2 mx-1 items-center'>
                                Ruby
                            </div>
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
          <div className='font-bold text-xl items-center p-2 w-full bg-slate-300 rounded-lg'>
            Your Projects 
          </div>
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
            <div className='w-2/12 p-2 h-[90dvh]'>
                <div className='bg-slate-200 h-full rounded-lg'>
                    <div className='w-full text-xl font-bold bg-slate-600 rounded-t-lg p-3'>
                        Notifications
                    </div>
                    <div className='w-full'>
                        <div className='w-full flex flex-row border-b-2 border-gray-400 p-2'>
                            <div className='w-2/3 flex flex-col'>
                                <text className='text-xl font-bold'>New message</text>
                                <text className='break-words font-light'> Hi Brian, your skills match well fo my project... </text>
                            </div>
                            <div className='w-1/3 flex flex-col items-center'>
                                <div className='w-16 h-16 bg-slate-800 flex justify-center items-center rounded-full text-sm'>
                                    photo
                                </div>
                                <text> Selene F. </text>
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

export default ProjectsPage