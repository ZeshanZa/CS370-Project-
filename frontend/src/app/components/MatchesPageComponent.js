import React from 'react'
import Profile from '../matches/Profile';
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';

function MatchesPageComponent() {
    const profiles = [
        {
          id: 1,
          name: "Alex Johnson",
          skills: ["Python", "Django", "JavaScript"],
          interests: ["Web Development", "Machine Learning"],
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Maria Garcia",
          skills: ["Java", "Spring Boot", "React"],
          interests: ["Full Stack Development", "Cloud Services"],
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "David Smith",
          skills: ["C#", ".NET Core", "Angular"],
          interests: ["Enterprise Software", "Game Development"],
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Linda Brown",
          skills: ["PHP", "Laravel", "Vue.js"],
          interests: ["E-commerce Sites", "Web Apps"],
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "James Wilson",
          skills: ["Ruby", "Rails", "React"],
          interests: ["Startup Projects", "API Development"],
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          id: 6,
          name: "Emily Clark",
          skills: ["Python", "Flask", "JavaScript"],
          interests: ["Data Analysis", "Backend Development"],
          imageUrl: "https://via.placeholder.com/150",
        },
      ];
      
  return (
    <div className='w-screen h-screen'>
      <div className='w-full p-2 flex flex-row justify-between bg-blue-900 text-white items-centerx'>
          <text className='w-max text-3xl'> <span className='text-blue-500'>Emory</span><span className='text-yellow-500'>Connect</span> </text>
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
          <div className='w-7/12 p-2'>
              <div>
                  <div className='font-bold text-xl items-center p-2 w-full bg-slate-300 rounded-lg'>
                      My Matches
                  </div>
                  <div className='flex flex-wrap p-2'>
                    {profiles.map((profile) => (
                      <Profile key={profile.id} profile={profile} />
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

export default MatchesPageComponent