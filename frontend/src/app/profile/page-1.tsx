import React from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';


function page() {
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
            <div className='w-7/12 flex h-[90dvh]' style={{marginTop:'0.5%'}}>
                <div className='w-2/12 h-[90dvh]'>
                    <div style={{marginBottom: '15%'}}>
                        <p>Full Name:</p>
                        <input type="text" className='rounded-lg border 1px solid #ccc borderRadius 4px'/>
                    </div > 
                    <div style={{marginBottom: '15%'}}>
                        <p>Username:</p>
                        <input type="text" className='rounded-lg border 1px solid #ccc borderRadius 4px'/>
                    </div>
                    <div style={{marginBottom: '15%'}}> 
                        <p>Website URL:</p>
                        <input type="text" className='rounded-lg border 1px solid #ccc borderRadius 4px'/>
                    </div>
                    <div style={{marginBottom: '15%'}}>
                        <p>Major:</p>
                        <input className='rounded-lg border 1px solid #ccc borderRadius 4px' type="text"/>
                    </div>
                    <div style={{marginBottom: '1%'}}>
                        <p>Skills:</p>
                        <input type="text" placeholder="Search for skills" className='rounded-lg border 1px solid #ccc borderRadius 4px mb-1'/>           
                    </div>
                    <input className='rounded-lg border 1px solid #ccc borderRadius 4px position absolute w-7/12' style={{height:'37%'}} type="text" placeholder="Your Skills"/> 
                </div>
                <div>
                    <div className='ml-40'>
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