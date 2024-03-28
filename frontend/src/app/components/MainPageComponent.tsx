import { Box, Divider, Drawer } from '@mui/material'
import React, { useState } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import StarIcon from '@mui/icons-material/Star'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'

function MainPageComponent() {
    const [ProfileDrawer, setProfileDrawer] = useState(false)
    const [NotificationsDrawer, setNotificationsDrawer] = useState(false)
    const router = useRouter()

    function ProjectComponent(title: string, description: string, link: string, isrc: string) {
        return(
            <div className='m-3 p-2 rounded-xl flex flex-col w-[80dvh]'>
                <img alt='image' src={isrc} className='rounded-xl mb-1 relative'/>
                <div className='flex flex-row justify-between font-bold text-xl'>
                    <text> {title} </text>
                    <StarIcon />
                </div>
                <text className='font-light text-sm whitespace-pre-line break-words'> {description} </text>
                <text className='font-bold'> {link} </text>
            </div>
        )
    }
    
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
                {ProjectComponent("AI-Powered Personal Finance Assistant", "Developed a web-based platform that allows users to securely share files with others. Implemented end-to-end encryption for data security and access control mechanisms to manage permissions for different users. Include features like file versioning, audit logs, and encryption key management for enhanced security.", "https://github.com/username/ai-finance-assistant", 'https://i.ytimg.com/vi/gYrpk8ntc94/maxresdefault.jpg')}
                {ProjectComponent("Secure File Sharing System", "Developed a web-based platform that allows users to securely share files with others. Implemented end-to-end encryption for data security and access control mechanisms to manage permissions for different users. Include features like file versioning, audit logs, and encryption key management for enhanced security.", "https://github.com/username/secure-file-sharing-system", "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/11/secure-file-transfer.jpg")}
                {ProjectComponent("Virtual Reality Museum Experience", "Created a virtual reality (VR) application that offers users an immersive museum experience. Developed 3D models of artworks or historical artifacts, designed interactive exhibits, and implemented VR navigation controls. Includes educational content, audio guides, and support for VR headsets to enhance the user experience.", "https://github.com/username/vr-museum-experience", "https://miro.medium.com/v2/resize:fit:1400/1*4MZMSant8iETJsfx7936lg.png")}
                {ProjectComponent("IoT-Based Smart Home Automation System", "Designed an IoT (Internet of Things) solution for automating various tasks in a smart home environment. Developed a central control system that can manage smart devices such as lights, thermostats, security cameras, and appliances. Implemented voice commands, scheduling options, and remote access through a mobile app for seamless home automation.", "https://github.com/username/iot-smart-home-automation", "https://miro.medium.com/v2/resize:fit:1080/1*ghYsQw8UbKExcvIBVwMSWQ.jpeg")}
            </div>
        </div>
    </div>
    </>
  )
}

export default MainPageComponent