import React from 'react'

type Props = {
    name: string;
    skills: any;
    github: string;
  }
  
function FriendComponent({name, skills, github} : Props) {
  return (
    <div className='flex flex-col bg-slate-200 rounded-md p-2 items-center justify-center w-min mx-2 my-4'>
        <text> {name} </text>
        <text> {skills} </text>
        <text> {github} </text>
    </div>
  )
}

export default FriendComponent