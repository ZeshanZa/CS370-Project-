"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Drawer,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import Layout from "../Layouts/Layout";
function ProjectsPage() {
  /*const router = useRouter();
    const [ProfileDrawer, setProfileDrawer] = useState(false);
    const [NotificationsDrawer, setNotificationsDrawer] = useState(false);

    const [profile, setProfile] = useState({
        fullName: '',
        major: '',
        githubUrl: '',
        bio: '',
        user_id: null,
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}:8000/profile/`, {
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
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);*/

  // Define team members here or load them from an API or external source
  const teamMembers = [
    {
      name: "Zeshan Zahid",
      role: "Developer",
      image: "/images/zeshan.jpg",
      Major: "Computer Science",
    },
    {
      name: "Artem Linde",
      role: "Developer",
      image: "/images/artem.jpg",
      Major: "ECON + CS",
    },
    {
      name: "Michael Abebe",
      role: "Developer",
      image: "/images/michael.jpg",
      Major: "ECON/CS + Math Minor",
    },
    {
      name: "Esme Richardson",
      role: "Developer",
      image: "/images/esme.jpg",
      Major: "CS",
    },
    {
      name: "Elijah Ting",
      role: "Developer",
      image: "/images/elijah.jpg",
      Major: "CS",
    },
    {
      name: "Nicole Zhou",
      role: "Developer",
      image: "/images/nicole.jpg",
      Major: "Business + CS",
    },
  ];

  /*return (
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
                                        <img src='https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg' />
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
                                        <img src='https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' />
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
                                    <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-bold mb-2'>{profile.fullName}</h2>
                                <p className='text-md mb-1'>{profile.major}</p>
                                <a href={profile.githubUrl} className='text-sm text-blue-500 mb-2'>{profile.githubUrl}</a>
                                <p className='text-sm bg-gray-200 p-3 rounded'>{profile.bio}</p>
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
                                    <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/mainpage") }}> Home </button>
                                    <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/matching") }}> Matching </button>
                                    <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/friendsList") }}> Friends </button>
                                    <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/profile") }}> Profile </button>
                                    <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/setpage") }}> Settings </button>
                                </div>
                            </div>
                            <div className='flex flex-grow items-center justify-center'>
                                <button className='bg-gray-300 py-1 w-full rounded-md text-slate-700 hover:bg-gray-500 hover:text-slate-200'> Sign Out </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Drawer>

            <div className='w-full h-full overflow-x-hidden'>
                <div className='flex flex-row justify-between px-5 py-6 items-center'>
                    <text className='relative text-3xl'> <span className='text-blue-600'>Emory</span> <span className='text-blue-400'>Connect</span> </text>
                    <div className='flex flex-row text-slate-600 items-center'>
                        <div className='cursor-pointer' onClick={() => setNotificationsDrawer(true)}><NotificationsNoneOutlinedIcon style={{ width: 30, height: 30 }} /></div>
                        <div className='mx-2' />
                        <div className='cursor-pointer' onClick={() => setProfileDrawer(true)}><AccountCircleOutlinedIcon style={{ width: 30, height: 30 }} /></div>
                    </div>
                </div>
                <Divider />
                <div className='p-3 text-slate-600'>
                    <Marquee>
                        <div className='mr-20' />
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
                <div className='py-5 px-5 w-full flex max-[750px]:flex-col justify-between shadow-md sticky top-0 bg-white z-30'>
                    <text className='text-3xl text-slate-600 max-[750px]:mb-2'> Meet Our Team </text>
                    <div className='max-[750px]:justify-around flex max-[750px]:w-full'>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/mainpage") }}> Home </button>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/matching") }}> Matching </button>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/friendsList") }}> Friends </button>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/profile") }}> Profile </button>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/setpage") }}> Settings </button>
                        <button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/aboutustest") }}> AboutUs </button>
                    </div>
                </div>*/
  //<div className='px-5 py-6'>
  {
    /* <Typography variant="h3" className="text-center text-blue-600">Meet Our Team</Typography> */
  }
  /*<Box className="flex flex-wrap justify-center">
        {teamMembers.map(member => (
            <Box key={member.name} className="p-4 max-w-sm w-1/3">
                <Avatar src={member.image} className="w-24 h-24 mx-auto" alt={`Image of ${member.name}`} />
                <Typography variant="h6" className="mt-2 text-center">{member.name}</Typography>
                <Typography className="text-center text-blue-400">{member.role}</Typography>
                <Typography className="text-center">{member.Major}</Typography>
            </Box>
        ))}
    </Box>
</div>*/
  //</div>
  //</>
  //);
  return (
    <Layout>
      <text className="text-3xl text-slate-600 max-[750px]:mb-2">
        {" "}
        Meet Our Team{" "}
      </text>
      <Box className="flex flex-wrap justify-center">
        {teamMembers.map((member) => (
          <Box key={member.name} className="p-4 max-w-sm w-1/3">
            <Avatar
              src={member.image}
              className="w-24 h-24 mx-auto"
              alt={`Image of ${member.name}`}
            />
            <Typography variant="h6" className="mt-2 text-center">
              {member.name}
            </Typography>
            <Typography className="text-center text-blue-400">
              {member.role}
            </Typography>
            <Typography className="text-center">{member.Major}</Typography>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}

export default ProjectsPage;
