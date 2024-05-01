"use client"; //For our react version have to use this
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Divider, Drawer } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Marquee from "react-fast-marquee";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

function Layout({ children }) {
  const [url, setUrl] = useState("");
  //console.log(url)
  const router = useRouter();
  const [ProfileDrawer, setProfileDrawer] = useState(false);
  const [NotificationsDrawer, setNotificationsDrawer] = useState(false);

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

  const [profile, setProfile] = useState({
    fullName: "",
    major: "",
    githubUrl: "",
    bio: "",
    user_id: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href); // Only accesses window when it's defined
    }
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
          headers: { 'Authorization' : `Token ${token}` }
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
      alert("Failed to fetch match notifications. Please try again.");
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
            {url == "https://ecsconnectbackend.com:8000/mainpage"
              ? "Your Projects"
              : url == "https://ecsconnectbackend.com:8000/startMatching"
                ? "Matching"
                : url == "https://ecsconnectbackend.com:8000/friendsList"
                  ? "Friends"
                  : url == "https://ecsconnectbackend.com:8000/profile"
                    ? "Profile"
                    : url == "https://ecsconnectbackend.com:8000/setpage"
                      ? "Settings"
                      : ""}{" "}
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
              onClick={() => {
                router.push("/matching");
              }}
            >
              {" "}
              Matching{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              onClick={() => {
                router.push("/friendsList");
              }}
            >
              {" "}
              Friends{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              onClick={() => {
                router.push("/profile");
              }}
            >
              {" "}
              Skills & Profile{" "}
            </button>
            <button
              className="text-lg mx-3 hover:bg-slate-200 rounded-sm px-2 py-1 max-[750px]:mx-0 max-[750px]:text-md"
              onClick={() => {
                router.push("/setpage");
              }}
            >
              {" "}
              Settings{" "}
            </button>
          </div>
        </div>
        <div className="px-5 py-6 max-[750px]:px-0 max-[750px]:py-1">
          <div className="w-full flex-wrap flex justify-center">
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
