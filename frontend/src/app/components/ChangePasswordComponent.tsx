import { Box, Divider, Drawer, TextField } from '@mui/material'
import React, { useState } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useRouter } from 'next/navigation'

function ChangePasswordComponent() {
    const [ProfileDrawer, setProfileDrawer] = useState(false)
    const [NotificationsDrawer, setNotificationsDrawer] = useState(false)
    const router = useRouter()
    
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
        <text className='ml-5 text-3xl text-slate-800 font-semibold'> Change Password </text>
        <div className='ml-20 w-72 border-4 border-blue-400 rounded-full my-2'></div>
        <div className='items-center flex justify-center h-4/5 w-full'>
            <div className='border-2 border-slate-200 rounded-2xl px-10 py-6 flex flex-col mx-2 w-full max-w-[500px]'>
                <text className='text-l font-semibold mb-1'> New Password </text>
                <span className='w-4/5'><TextField size='small' placeholder='password...' type='password' fullWidth/></span>
                <text className='text-l font-semibold mb-1 mt-8'> Confirm New Password </text>
                <span className='w-4/5'><TextField size='small' placeholder='password...' type='password' fullWidth/></span>
                <span className=''><button className='bg-blue-400 text-white w-full max-w-[200px] rounded-md mt-8 p-1 hover:bg-blue-600'> Change Password </button></span>
            </div>
        </div>
    </div>
    </>
  )
}

export default ChangePasswordComponent