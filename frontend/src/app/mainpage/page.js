"use client"; //For our react version have to use this
import React, { useState, useEffect } from "react";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";
import StarIcon from "@mui/icons-material/Star";
import { Box, Divider, Drawer } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Marquee from "react-fast-marquee";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import introJs from "intro.js";
import "intro.js/introjs.css";

function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectGitHub, setNewProjectGitHub] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null); //Use state has to be set null
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editGitHub, setEditGitHub] = useState("");
  const [editContributors, setEditContributors] = useState([])
  const [ProfileDrawer, setProfileDrawer] = useState(false);
  const [NotificationsDrawer, setNotificationsDrawer] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [user_id_map, setUser_id_map] = useState({})

  const [itemsToShow, setItemsToShow] = useState(2);


  const [friendRequestNotifications, setFriendRequestNotifications] = useState([])
  const [pendingRequestNotifications, setPendingRequestNotifications] = useState([])
  const [matchRequestNotifications, setMatchRequestNotifications] = useState([])
  const [pendingMatchNotifications, setPendingMatchNotifications] = useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  function ProjectComponent(title, description, link, isrc, project) {
    //console.log(user_id_map)
    return (
      <div className="m-3 p-2 rounded-xl flex flex-col w-[80dvh]">
        <img alt="image" src={isrc} className="rounded-xl mb-1 relative" />
        <div className="flex flex-row justify-between font-bold text-xl">
          <text> {title} </text>
          <div>
            <button onClick={async () => {
              let cusername = prompt("Please enter an existing username")
              let cid = null
              let flag = true
              for (let i = 0; i < allUsers.length; i++) {
                //console.log(allUsers[i].username)
                if (cusername == allUsers[i].username) {
                  cid = allUsers[i].id
                  flag = false
                  break
                }
              }
              if (flag) {
                alert("User not found")
                return
              }
              //alert("User found")
              let carr = project.contributors
              carr.push(cid)
              try {
                await axios.put(
                  `${process.env.NEXT_PUBLIC_API_URL}/projects/${project.id}/`,
                  {
                    user: profile.user_id,
                    title: project.title,
                    description: project.description,
                    github_url: project.github_url,
                    contributors: carr, //format - id of contributors
                  },
                  {
                    headers: {
                      Authorization: `Token ${localStorage.getItem("access_token")}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (typeof window !== "undefined") {
                  // Safe to use window here
                  window.location.reload();
                }
              } catch (error) {
                console.error("Error updating project contributors:", error);
              }
            }} className="m-2 bg-blue-400 rounded-md text-white font-semibold py-1 px-2 hover:bg-blue-600">
              Add Contributors
            </button>
            <button onClick={() => {
              handleEditProject(project);
              setAnchorEl(null);
            }} className="m-2 bg-blue-400 rounded-md text-white font-semibold py-1 px-2 hover:bg-blue-600">
              Edit
            </button>
            <button onClick={() => {
              handleDeleteProject(project.id);
              setAnchorEl(null);
            }} className="bg-blue-400 rounded-md text-white font-semibold py-1 px-2 hover:bg-blue-600">
              Delete
            </button>
          </div>
          {/*<IconButton
            id="options-button"
            aria-controls={open ? "options-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="text-black w-8 h-8 items-center flex justify-center">
              <MoreVertIcon />
            </div>
          </IconButton>
          <Menu
            id="options-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
            MenuListProps={{
              "aria-labelledby": "options-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleEditProject(project);
                setAnchorEl(null);
              }}
            >
              {<text>Edit</text>}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteProject(project.id);
                setAnchorEl(null);
              }}
            >
              {<text>Delete</text>}
            </MenuItem>
            </Menu> -- comented out untill fixed*/}
        </div>
        <text className="font-light text-sm whitespace-pre-line break-words">
          {" "}
          {description}{" "}
        </text>
        <text>Contributors:</text>
        <div className="flex flex-wrap">
          {project.contributors.map((contributor) =>
            <div className="mx-1 bg-slate-200 rounded-md py-1 px-3" key={contributor}>
              <text>{user_id_map[contributor]}</text>
              <button className="ml-2 border-l-[1px] pl-2 border-slate-700" onClick={async () => {
                let confirmbtn = confirm(`Are you sure you want to remove ${user_id_map[contributor]} from the project?`)
                if (confirmbtn) {
                  //console.log("yes")
                  let carr = project.contributors
                  let indexofitem = carr.indexOf(contributor)
                  carr.splice(indexofitem, 1)
                  try {
                    await axios.put(
                      `${process.env.NEXT_PUBLIC_API_URL}/projects/${project.id}/`,
                      {
                        user: profile.user_id,
                        title: project.title,
                        description: project.description,
                        github_url: project.github_url,
                        contributors: carr, //format - id of contributors
                      },
                      {
                        headers: {
                          Authorization: `Token ${localStorage.getItem("access_token")}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (typeof window !== "undefined") {
                      // Safe to use window here
                      window.location.reload();
                    }
                  } catch (error) {
                    console.error("Error removing project contributors:", error);
                  }
                }
              }}> X </button>
            </div>
          )}
        </div>
        <text className="font-bold"> {link} </text>
      </div>
    );
  }

  useEffect(() => {
    // This code will only run on the client side
    const skipButton = document.querySelector(".introjs-skipbutton");
    if (skipButton) skipButton.style.display = "none";

    if (localStorage.getItem("needTutorial") == "yes") {
      introJs()
        .oncomplete(function () {
          localStorage.setItem("needTutorial", "no");
        })
        .setOptions({
          exitOnOverlayClick: false,
          showProgress: true,
          showBullets: false,

          steps: [
            {
              intro:
                "Welcome to your homepage! Here's where you'll find your projects.",
            },
            {
              element: document.getElementById("yourProjectsButton"),
              intro:
                "Click here to add new projects. Your friends can see and request to join projects.",
              position: "right",
            },
            {
              element: document.getElementById("profile"),
              intro:
                "You can change your personal information here. This is also where you change add/remove skills in order to begin matching.",
              position: "left",
            },
            {
              element: document.getElementById("matches"),
              intro:
                "You must input skills in order to match! After setting skills, click here to begin matching with other users.",
              position: "right",
            },

            {
              element: document.getElementById("friends"),
              intro: "This is where you can request and search for friends.",
              position: "right",
            },
            {
              element: document.getElementById("settings"),
              intro: "You can change your password in setting.",
              position: "right",
            },
            {
              intro: "You're all done!",
            },
          ],
        })
        .start();
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setProjects(response.data); // Projects returned
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchAllUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/userslist/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setAllUsers(response.data); // Projects returned
        let tempMap = {}
        for (let i = 0; i < response.data.length; i++) {
          tempMap[response.data[i].id] = response.data[i].username
        }
        setUser_id_map(tempMap)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProjects();
    fetchAllUser();
  }, []);

  const [profile, setProfile] = useState({
    fullName: "",
    major: "",
    githubUrl: "",
    bio: "",
    user_id: null,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      //Artem I believe for your drawer stuff you were showing you can copy and paste this into it
      const token = localStorage.getItem("access_token");
      // const token = '8664926ffd6d5e7ab5fc623b8363d28a5a029be5';
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setProfile({
          fullName: response.data.full_name || "",
          major: response.data.major || "",
          githubUrl: response.data.github_url || "",
          bio: response.data.bio || "",
          user_id: response.data.user || "",
        });
        console.log("Fetched user_id:", response.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token"); //Maybe we should find another way to store token
    const projectData = {
      user: profile.user_id,
      title: newProjectTitle,
      description: newProjectDescription,
      github_url: newProjectGitHub,
      contributors: [],
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/create/`,
        projectData,
        {
          //I decided to remove local variable since some of yall are havin issues so just put URL instead
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewProjectTitle("");
      setNewProjectDescription("");
      setNewProjectGitHub("");
      setShowAddProjectForm(false); // Hide the form upon successful submission
      if (typeof window !== "undefined") {
        // Safe to use window here
        window.location.reload();
      }
      // Force reload the page for some reason it wont reload when I fetch them but this way works same for editing
    } catch (error) {
      console.error("Error adding project:", error);
      if (error.response.data.github_url)
        alert(error.response.data.github_url)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleDeleteProject = async (projectId) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      // Filter out the deleted project from the state
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Start editing a project
  const handleEditProject = (project) => {
    setEditingProjectId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditGitHub(project.github_url);
    setEditContributors(profile.contributor);
    setShowAddProjectForm(true); // Assuming you use the same form for add/edit, show it.
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditTitle("");
    setEditDescription("");
    setEditGitHub("");
    setEditContributors([]);
    setShowAddProjectForm(false); // Hide the form.
  };

  // Submit edited project
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${editingProjectId}/`,
        {
          user: profile.user_id,
          title: editTitle,
          description: editDescription,
          github_url: editGitHub,
          contributors: editContributors, //format - id of contributors
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleCancelEdit(); // Reset editing state
      if (typeof window !== "undefined") {
        // Safe to use window here
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // the start of notifications
  const fetchUsernameForNotifications = async (notifications, getUserId) => {
    return Promise.all(notifications.map(async (notification) => {
      const userId = getUserId(notification);
      if (!userId) {
        console.log("Missing user ID for notification:", notification);
        return { ...notification, username: 'Unkown User' }; 
      }
      const username = await fetchUsername(userId);
      return { ...notification, username };
    }));
  };
  
  const fetchUsername = async (userId) => {
    if (!userId) {
      console.warn("fetchUsername was called with undefined userId");
      return 'Unknown User';
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-username/${userId}`);
      console.log("Username fetched for ID:", userId, "Username:", response.data.username);
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username for user ID:", userId, error);
      return 'Mystery User'; 
    }
  };

  useEffect(() => {
    const checkNotifications = async () => {
      
      await checkFriendRequests();
      await checkPendingRequests();
      await checkMatchRequests();
      await checkPendingMatches();
    };

    // Call the function immediately when the component mounts
    checkNotifications();

    
    const intervalId = setInterval(checkNotifications, 10000); // 10 seconds interval

    
    return () => clearInterval(intervalId);
  }, [profile.user_id]);


  // friend request notif stuff

  const checkFriendRequests = async () => {
    if (!profile.user_id) {
      console.log('No user_id available to check friend requests');
      return;
    }
    
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log('No access token available');
      return;
    }

    console.log('Making API call to check friend requests');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/friendsList/check_friend_request_status/${profile.user_id}`, {
        headers: { 'Authorization' : `Token ${token}` }
    });
    console.log("Friend requests received:", response.data);
    if (response.data && response.data.length > 0) {
      const enrichedNotifications = await fetchUsernameForNotifications(response.data, notif => notif.reqReceiver);
        setFriendRequestNotifications(enrichedNotifications);
    } else {
        console.log('No new friend requests');
    }
    } catch (error) {
      console.error("Error checking friend request status:", error);
    }
  };

  const checkPendingRequests = async () => {
    if (!profile.user_id) {
      console.log('No user_id available to check friend requests');
      return;
  }
  
  const token = localStorage.getItem("access_token");
  if (!token) {
      console.log('No access token available');
      return;
    }

    console.log('Making API call to check pending requests');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/friendsList/pending_requests/${profile.user_id}`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      console.log("Pending requests received:", response.data);
      if (response.data && response.data.length > 0) {
        const enrichedNotifications = await fetchUsernameForNotifications(response.data, notif => notif.reqSender);
        setPendingRequestNotifications(enrichedNotifications);
      } else {
        console.log('No new pending requests');
      }
    } catch (error) {
      console.error("Error checking pending request status:", error);
  }
};

const handleNotificationInteractedClick = async (notification) => {
  const token = localStorage.getItem("access_token"); 
  const friendRequestId = notification.friendRequest_id; 

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/friendsList/mark_notification_as_sent_interacted/${friendRequestId}/`,
        {},
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const updatedNotifications = friendRequestNotifications.filter(notif => notif.friendRequest_id !== friendRequestId);
      setFriendRequestNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking interacted notification as sent:", error);
      alert("Failed to mark interacted notification as seen.");
    }
  };

const handleNotificationPendingClick = async (notification) => {
  const token = localStorage.getItem("access_token");
  const friendRequestId = notification.friendRequest_id;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/friendsList/mark_notification_as_sent_pending/${friendRequestId}/`,
        {},
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const updatedNotifications = pendingRequestNotifications.filter(notif => notif.friendRequest_id !== friendRequestId);
      setPendingRequestNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking pending notification as sent:", error);
      alert("Failed to mark pending notification as seen.");
    }
  };


  // matching notification stuff

  const checkMatchRequests = async () => {
    if (!profile.user_id) {
      console.log('No user_id available to check match requests');
      return;
  }
  
  const token = localStorage.getItem("access_token"); 
  if (!token) {
      console.log('No access token available');
      return;
    }

  console.log('Making API call to check match requests');
  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/check_match_request_status/${profile.user_id}`, {
          headers: { 'Authorization' : `Token ${token}` }
      });
      console.log("Match requests received:", response.data);
      if (response.data && response.data.length > 0) {
        const enrichedNotifications = await fetchUsernameForNotifications(response.data, notif => notif.receiver_id);
        setMatchRequestNotifications(enrichedNotifications);
      } else {
        console.log('No new match requests');
      }
    } catch (error) {
      console.error("Error checking match request status:", error);
    }
  };

  const checkPendingMatches = async () => {
    if (!profile.user_id) {
      console.log('No user_id available to check match requests');
      return;
    }

const token = localStorage.getItem("access_token"); 
if (!token) {
    console.log('No access token available');
    return;
}

console.log('Making API call to check pending matches');
try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pending_requests/${profile.user_id}`, {
        headers: { 'Authorization' : `Token ${token}` }
    });
    console.log("Pending matches received:", response.data);
    if (response.data && response.data.length > 0) {
      const enrichedNotifications = await fetchUsernameForNotifications(response.data, notif => notif.sender_id);
        setPendingMatchNotifications(enrichedNotifications);
    } else {
        console.log('No new pending mctches');
      }
    } catch (error) {
      console.error("Error checking pending matches status:", error);
    }
  };


const handleMatchNotificationInteractedClick = async (notification) => {
  const token = localStorage.getItem("access_token"); 
  const pk = notification.id; 
  
  try {
      await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/mark_notification_as_sent_interacted/${pk}/`,
          {},
          {
              headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
              }
          }
      );
      
      const updatedNotifications = matchRequestNotifications.filter(notif => notif.id !== pk);
      setMatchRequestNotifications(updatedNotifications);
  } catch (error) {
      console.error("Error marking match interacted notification as sent:", error);
      alert("Failed to mark match interacted notification as seen.");
  }
  };

const handleMatchNotificationPendingClick = async (notification) => {
const token = localStorage.getItem("access_token"); 
const pk = notification.id; 

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/mark_notification_as_sent_pending/${pk}/`,
        {},
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
    );
    
    const updatedNotifications = pendingMatchNotifications.filter(notif => notif.id !== pk);
    setPendingMatchNotifications(updatedNotifications);
} catch (error) {
    console.error("Error marking pending match notification as sent:", error);
    alert("Failed to mark pending match notification as seen.");
}
};

const allNotifications = [
  ...friendRequestNotifications.map(notif => ({ ...notif, type: 'Friend Request' })),
  ...pendingRequestNotifications.map(notif => ({ ...notif, type: 'Pending Friend Request' })),
  ...matchRequestNotifications.map(notif => ({ ...notif, type: 'Match Request' })),
  ...pendingMatchNotifications.map(notif => ({ ...notif, type: 'Pending Match Request' }))
];

const handleNotificationClick = (notification) => {
  switch (notification.type) {
    case 'Friend Request':
      handleNotificationInteractedClick(notification);
      router.push("/find_friends");
      break;
    case 'Pending Friend Request':
      handleNotificationPendingClick(notification);
      router.push("/find_friends");
      break;
    case 'Match Request':
      handleMatchNotificationInteractedClick(notification);
      router.push("/matching");
      break;
    case 'Pending Match Request':
      handleMatchNotificationPendingClick(notification);
      router.push("/matching");
      break;
    default:
      console.error('Unhandled notification type:', notification.type);
      break;
  }
}

const getNotificationContent = (notification) => {
  let message = '';
  switch (notification.type) {
    case 'Friend Request':
      message = `Your friend request to ${notification.username} has been ${notification.status}.`;
      break;
    case 'Pending Friend Request':
      message = `You have a pending friend request from ${notification.username}.`;
      break;
    case 'Match Request':
      message = `Your match request to ${notification.username} has been ${notification.status}.`;
      break;
    case 'Pending Match Request':
      message = `You have a pending match request from ${notification.username}.`;
      break;
    default:
      message = `Notification type not recognized.`;
  }
  return message;
};

return (
  <>
    <Drawer
      open={NotificationsDrawer}
      anchor="left"
      onClose={() => setNotificationsDrawer(false)}
    >
      <Box width={350}>
        <div className="h-[100dvh] p-2">
          <div className="w-full text-xl font-bold p-3 border-b-2 border-slate-900">
            Notifications
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col p-2">
              {allNotifications.length > 0 ? (
                allNotifications.map((notification, index) => (
                  <div key={notification.id} className="w-full flex flex-row items-center border-b-[1px] border-gray-400 py-2">
                    <div className="flex-grow">
                      <text className="text-xl font-bold">{notification.type} Update</text>
                      <div className="break-words font-light">
                        <span>{getNotificationContent(notification)}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button onClick={() => handleNotificationClick(notification)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full p-4 text-center text-gray-600">
                  <p>No new notifications.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Drawer>

      <Drawer
        open={ProfileDrawer}
        anchor="right"
        onClose={() => setProfileDrawer(false)}
      >
        <Box width={350}>
          <div className="p-2 h-[100dvh]">
            <div className="w-full h-full rounded-lg px-4 flex flex-col space-y-8 text-center">
              <div className="w-full items-center justify-center flex">
                <div className="rounded-full items-center h-60 w-60 flex justify-center mt-10">
                  {/*<img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />*/}
                  <img src="./pfp.jpg" alt='Profile picture' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="flex-col justify-center ">
                <h2 className="text-2xl font-bold mb-2">{profile.fullName}</h2>
                <p className="text-lg ">Intended Major: {profile.major}</p>
                <p className="p-3 rounded text-lg">
                  Git Hub: {profile.githubUrl}
                </p>
                <p className="p-3 rounded text-lg">
                  Bio: {profile.bio}
                </p>
                <div className="w-full mt-2 flex flex-row flex-wrap justify-around text-white"></div>
                <div className="flex justify-center space-x-4 py-2"></div>
              </div>
              <div className="flex flex-grow items-center justify-center">
                <button
                  className="bg-gray-300 py-1 w-full rounded-md text-slate-700 hover:bg-gray-500 hover:text-slate-200 text-base"
                  onClick={handleLogout}
                >
                  {" "}
                  Sign Out{" "}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
      <div className="w-[100dvw] h-[100dvh] overflow-x-hidden">
        <div className="flex flex-row justify-between px-5 py-6 items-center">
          <text className="relative text-3xl">
            {" "}
            <span className="text-blue-600">Emory</span>{" "}
            <span className="text-blue-400">Connect</span>{" "}
          </text>
          <div className="flex flex-row text-slate-600 items-center">
            <div
              className="cursor-pointer"
              id="notificationsIcon"
              onClick={() => setNotificationsDrawer(true)}
            >
              <NotificationsNoneOutlinedIcon
                style={{ width: 30, height: 30 }}
              />
            </div>
            <div className="mx-2" />
            <div
              className="cursor-pointer"
              onClick={() => setProfileDrawer(true)}
            >
              <AccountCircleOutlinedIcon style={{ width: 30, height: 30 }} />
            </div>
          </div>
        </div>
        <Divider />
        <div className="p-3 text-slate-600">
          <Marquee>
            <div className="mr-20" />
            <text className="text-xl mx-8 font-semibold">
              {" "}
              Most looked for languages today:{" "}
            </text>
            <text className="text-xl mx-8"> React </text>
            <text className="text-xl mx-8"> Python </text>
            <text className="text-xl mx-8"> Java </text>
            <text className="text-xl mx-8"> C </text>
            <text className="text-xl mx-8"> C++ </text>
            <text className="text-xl mx-8"> CSS </text>
            <text className="text-xl mx-8"> HTML </text>
            <text className="text-xl mx-8"> JavaScript </text>
            <text className="text-xl mx-8"> SQL </text>
            <text className="text-xl mx-8"> PHP </text>
            <text className="text-xl mx-8"> R </text>
            <text className="text-xl mx-8"> GO </text>
            <text className="text-xl mx-8"> Typescript </text>
            <text className="text-xl mx-8"> Swift </text>
            <text className="text-xl mx-8"> C# </text>
            <text className="text-xl mx-8"> Kotlin </text>
            <text className="text-xl mx-8"> Unity </text>
            <text className="text-xl mx-8"> React-Native </text>
            <text className="text-xl mx-8"> Rust </text>
            <text className="text-xl mx-8"> Assembly </text>
            <text className="text-xl mx-8"> Matlab </text>
            <text className="text-xl mx-8"> Delphi </text>
            <text className="text-xl mx-8"> Scala </text>
            <text className="text-xl mx-8"> React </text>
            <text className="text-xl mx-8"> Python </text>
            <text className="text-xl mx-8"> Java </text>
            <text className="text-xl mx-8"> C </text>
            <text className="text-xl mx-8"> C++ </text>
            <text className="text-xl mx-8"> CSS </text>
            <text className="text-xl mx-8"> HTML </text>
            <text className="text-xl mx-8"> JavaScript </text>
            <text className="text-xl mx-8"> SQL </text>
            <text className="text-xl mx-8"> PHP </text>
            <text className="text-xl mx-8"> R </text>
            <text className="text-xl mx-8"> GO </text>
            <text className="text-xl mx-8"> Typescript </text>
            <text className="text-xl mx-8"> Swift </text>
            <text className="text-xl mx-8"> C# </text>
            <text className="text-xl mx-8"> Kotlin </text>
            <text className="text-xl mx-8"> Unity </text>
            <text className="text-xl mx-8"> React-Native </text>
            <text className="text-xl mx-8"> Rust </text>
            <text className="text-xl mx-8"> Assembly </text>
            <text className="text-xl mx-8"> Matlab </text>
            <text className="text-xl mx-8"> Delphi </text>
            <text className="text-xl mx-8"> Scala </text>
          </Marquee>
        </div>
        <Divider />
        <div className="py-5 px-5 w-full flex max-[750px]:flex-col justify-between shadow-md sticky top-0 bg-white z-30">
          <text className="text-3xl text-slate-600 max-[750px]:mb-2">
            {" "}
            Your Projects{" "}
          </text>
          <div className="max-[750px]:justify-around flex max-[750px]:w-full">
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              onClick={() => {
                router.push("/mainpage");
              }}
            >
              {" "}
              Home{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              id="matches"
              onClick={() => {
                router.push("/matching");
              }}
            >
              {" "}
              Matching{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              id="friends"
              onClick={() => {
                router.push("/friendsList");
              }}
            >
              {" "}
              Friends{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              id="profile"
              onClick={() => {
                router.push("/profile");
              }}
            >
              {" "}
              Skills & Profile{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              id="settings"
              onClick={() => {
                router.push("/setpage");
              }}
            >
              {" "}
              Settings{" "}
            </button>
            {/*<button className='text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md' onClick={() => { router.push("/aboutustest") }}> AboutUs </button> -- Breaks phone view */}
          </div>
        </div>
        <div className="px-5 py-6">
          <div className="w-full flex-wrap flex justify-center">
            <div className="w-full h-full">
              <div className="w-full p-2">
                <div className="text-right mb-4">
                  <button
                    id="yourProjectsButton"
                    onClick={() => setShowAddProjectForm(!showAddProjectForm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {showAddProjectForm ? "Cancel" : "Add Project"}
                  </button>
                </div>

                {showAddProjectForm && (
                  <div className="w-full flex justify-center">
                    <div className="mb-4 p-4 w-1/2 bg-white rounded shadow">
                      <form
                        onSubmit={
                          editingProjectId
                            ? handleEditSubmit
                            : handleAddProjectSubmit
                        }
                      >
                        <input
                          type="text"
                          placeholder="Title"
                          value={editingProjectId ? editTitle : newProjectTitle}
                          onChange={(e) =>
                            editingProjectId
                              ? setEditTitle(e.target.value)
                              : setNewProjectTitle(e.target.value)
                          }
                          className="mb-2 p-2 rounded border border-gray-300 w-full"
                        />
                        <textarea
                          placeholder="Description"
                          value={
                            editingProjectId
                              ? editDescription
                              : newProjectDescription
                          }
                          onChange={(e) =>
                            editingProjectId
                              ? setEditDescription(e.target.value)
                              : setNewProjectDescription(e.target.value)
                          }
                          className="mb-2 p-2 rounded border border-gray-300 w-full"
                        ></textarea>
                        <input
                          type="text"
                          placeholder="GitHub"
                          value={editingProjectId ? editGitHub : newProjectGitHub}
                          onChange={(e) =>
                            editingProjectId
                              ? setEditGitHub(e.target.value)
                              : setNewProjectGitHub(e.target.value)
                          }
                          className="mb-2 p-2 rounded border border-gray-300 w-full"
                        />
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          {editingProjectId ? "Update Project" : "Submit"}
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
                  </div>
                )}

                <div>
                  {projects.length === 0 && !showAddProjectForm ? (
                    <div className="w-full p-4 text-center text-gray-600">
                      <p>
                        No projects to display. Start by adding a new project!
                      </p>
                    </div>
                  ) : (
                    <div className="w-full flex-wrap flex justify-center">
                      {projects
                        .slice(0, itemsToShow)
                        .map((project) =>
                          ProjectComponent(
                            project.title,
                            project.description,
                            project.github_url,
                            "https://s1.significados.com/foto/software-og.jpg",
                            project
                          )
                        )}
                    </div>
                  )}
                  <button
                    className="underline"
                    hidden={
                      itemsToShow >= projects.length || projects.length <= 2
                    }
                    onClick={() => {
                      if (projects.length > itemsToShow) {
                        setItemsToShow(itemsToShow + 4);
                      }
                    }}
                  >
                    {" "}
                    Expand for more...{" "}
                  </button>
                  <button
                    className="underline"
                    hidden={
                      itemsToShow < projects.length || projects.length <= 2
                    }
                    onClick={() => {
                      setItemsToShow(2);
                    }}
                  >
                    {" "}
                    Collapse projects...{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
