import React, {useState, useEffect} from 'react'
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faX } from '@fortawesome/free-solid-svg-icons';
import './projectModal.css';
import '../matches/App.css';

type Props = {
    name: string;
    skills: any;
    github: string;
  }


function FriendComponent({name, skills, github} : Props) {
  const token = localStorage.getItem('access_token');

  const [projects, setProjects] = useState(null);
  const [friendProfile, setFriendProfile] = useState(null);
  const [modal, setModal] = useState(false); 
  const [showProjects, setShowProjects] = useState(false); 
  const [usernameById, setUsernameById] = useState<string>(''); 
  const [Contributors, setContributors] = useState([]); 

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      // fetchProfileData(profile.name);
      fetchFriendProfile(); 
    }
  };

  const toggleShowProjects = async () => {
    setShowProjects(!showProjects); 
    if (!showProjects) {
      friendsProjects(); 
      console.log(projects); 
      const contributors = projects[0].contributors;
      const result = [] 
      for (let i = 0; i < contributors.length; i++) {
        await idToUsername(contributors[i]);
        result[i] = usernameById;
      }
      setContributors(result); 
      console.log(Contributors); 
    }
  }

  const fetchFriendProfile = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/friendsList/friendProfile/${name}`, {
        headers: { 'Authorization': `Token ${token}` }
      }); 
      setFriendProfile(response.data);
      setModal(!modal); 
      friendsProjects(); 
      console.log(projects); 

    } catch (error) {
        console.error('Error fetching profile:', error); 
        return null; 
    }
  }

  const fetchUsername = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-username/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const { username } = response.data;
        console.log('Username:', username);
        return username;  // You can use this username in your application
    } catch (error) {
        console.error('Error fetching username:', error);
        return null;
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
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

  const friendsProjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/friend-project/${name}`); 
      setProjects(response.data); 
    } catch (err) {
      console.error(err.message); 
    }
  }; 

  const idToUsername = async (id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-username/${id}/`); 
      setUsernameById(response.data); 
    } catch (err) {
        console.error(err.message); 
    }
  }

  const handleRemoveFriend = async (friend_username) => {
    const self_username = await fetchUsername(); 
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/friendsList/removeFriend/${self_username}/${friend_username}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        alert(response.data.message);
    } catch (error) {
        alert('Failed to remove friend: ' + error.response.data.error);
    }
};

  return (

    <div className='w-full h-full'>

    {modal && (
      <div className='modal z-50'>
        <div className='overlay'></div>
        <div className='modal-content flex flex-col justify-center'>
          <div className='flex flex-col'>
            {showProjects ? (
              <>
                <div className='flex flex-row w-full justify-start'>
                  <button onClick={toggleShowProjects} className='flex justify-start'><FontAwesomeIcon icon={faArrowLeft}/></button><br></br>
                </div>
                <div className='overflow-y-auto max-h-96'>
                <h2 className='flex justify-center font-bold'>Projects</h2><br></br>
                {projects.map((project) => ( // Fixed this line
                  <div key={project?.id}> 
                    <p>Title: {project?.title} </p>
                    <p>Description: {project?.description} </p>
                    <p>Contributors: {Contributors.map((contributor, index) => <span key={index}>{contributor.username}</span>)}</p>
                    <p>Github URL: {project?.github_url} </p> <br></br>
                  </div>
                ))}
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleModal} className='flex justify-start'><FontAwesomeIcon icon={faX}/></button><br></br>
                <h2 className='flex justify-center'>{friendProfile?.full_name}</h2>
                <div className='flex justify-center'><img src="./pfp.jpg" alt="Profile"/></div> {/* Added alt attribute */}
                <p>Major: {friendProfile?.major}</p><br></br>
                <p>Bio: {friendProfile?.bio}</p><br></br>
                <p>Github: {friendProfile?.github_url} </p>
                <span className='underline' style={{cursor:'pointer'}} onClick={toggleShowProjects}>View projects</span> {/* Changed from <text> to <span> */}
              </>
            )}
          </div>
        </div>
      </div>
    )}
      
      <div className='flex flex-col'>
        <div className='flex flex-row border'>
          <div style={{ flex: '0 0 auto', width: '50px', height: '50px', overflow: 'hidden' }}>
              <img src="./pfp.jpg" alt='Profile picture' style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <div className='flex flex-col p-2'>
            <text className='hover:underline' style={{cursor: 'pointer'}} onClick={() => fetchFriendProfile()}> {name} </text>
            <text className='text-xs whitespace-nowrap text-gray-500'> Skills: {skills} </text>
            <text className='text-xs whitespace-nowrap text-gray-500'> Email: {github} </text>
          </div>
          <div className='w-full flex justify-end mr-2'>
            <button className='text-xs hover:underline' onClick={() => handleRemoveFriend(name)}>Remove friend</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendComponent 
    /*
<div className='flex flex-row'>
       <div className='flex flex-col bg-slate-200 rounded-md p-2 items-center justify-center w-min mx-2 my-4'>
        <text onClick={() => friendsProjects(name)}> {name} </text>
        <text> {skills} </text>
        <text> {github} </text>
        <div>
          <button onClick={() => handleRemoveFriend(name)} className='text-xs mt-4 p-1.5 bg-red-400 border rounded-lg '>Remove friend</button>
        </div>
    </div>
    </div>
    
  )
}

export default FriendComponent
*/