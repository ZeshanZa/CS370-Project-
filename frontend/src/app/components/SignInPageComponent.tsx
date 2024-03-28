"use client"
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

function SignInPageComponent() {
  const [signIn, setSignIn] = useState(true)
  const router = useRouter()

  return (
    <div className='flex justify-center flex-row items-center w-screen h-[100dvh]'>
      <text className='absolute top-5 left-5 text-3xl'> <span className='text-blue-600'>Emory</span> <span className='text-blue-400'>Connect</span> </text>
        <div className='w-full h-full items-center flex justify-end'>
          <div className='text-left p-4 pr-20 h-1/2 flex justify-center items-center'>
            <div className='h-min'>
              <text className='text-6xl whitespace-pre-line'>Welcome to {'\n'} Emory Connect</text>
              <div className='w-1/2 border-4 border-blue-400 rounded-full my-6'></div>
              <text className='text-xl whitespace-pre-line'>A place where computer scientists {'\n'} connect and collaborate</text>
              <div className='my-2'/>
              <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Connect',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Collaborate',
                1000,
                'Learn',
                1000,
                'Innovate',
                1000
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={Infinity}
            />
            </div>
          </div>
        </div>
        <div className='w-full h-full items-center flex justify-start'>
          <div className='text-left p-4 pl-20 h-1/2 flex justify-center items-center border-l-[1px] border-slate-600'>
            <div className='h-min flex flex-col items-start'>
              {signIn ?
                <>
                  <text className='text-6xl'> Sign In </text>
                  <div className='my-2'>
                    <text className='text-lg'>Need an Emory Connect Account?</text>
                    <button className='bg-slate-200 rounded-md px-1 ml-2 text-md' onClick={() => setSignIn(false)}> Switch to Sign Up </button>
                  </div>
                  <text className='font-bold text-lg mt-4'> Username </text>
                  <span className='w-4/5'><TextField size='small' placeholder='username...' fullWidth/></span>
                  <text className='font-bold text-lg mt-3'> Email </text>
                  <span className='w-4/5'><TextField size='small' placeholder='email@example.com...' fullWidth/></span>
                  <div className='flex flex-row justify-between w-4/5 mt-3'>
                    <text className=' font-bold text-lg'> Password </text>
                    <button className='text-blue-400 font-light'> Forgot Password? </button>
                  </div>
                  <span className='w-4/5 mb-3'><TextField size='small' placeholder='password...' type='password' fullWidth/></span>
                  <span className='w-5/12'><button className='bg-blue-400 text-white w-full rounded-md mt-3 p-1 hover:bg-blue-600' onClick={() => {router.push('/test')}}> Sign In </button></span>
                </> :
                <>
                  <text className='text-6xl'> Sign up </text>
                  <div className='my-2'>
                    <text className='text-lg'>Already have an an Emory Connect Account?</text>
                    <button className='bg-slate-200 rounded-md px-1 ml-2 text-md' onClick={() => setSignIn(true)}> Switch to Sign In </button>
                  </div>
                  <text className='font-bold text-lg mt-4'> Username </text>
                  <span className='w-4/5'><TextField size='small' placeholder='username...' fullWidth/></span>
                  <text className='font-bold text-lg mt-3'> Email </text>
                  <span className='w-4/5'><TextField size='small' placeholder='email@example.com...' fullWidth/></span>
                  <text className=' font-bold text-lg mt-3'> Password </text>
                  <span className='w-4/5'><TextField size='small' placeholder='password...' type='password' fullWidth/></span>
                  <text className=' font-bold text-lg mt-3'> Confirm Password </text>
                  <span className='w-4/5 mb-3'><TextField size='small' placeholder='password...' type='password' fullWidth/></span>
                  <span className='w-5/12'><button className='bg-blue-400 text-white w-full rounded-md mt-3 p-1 animate-pulse hover:bg-blue-600'> Sign Up </button></span>
                </>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignInPageComponent