const fetchUsername = async () => {
  try {
      const response = await axios.get('https://ecsconnectbackend.com:8000/get-username/', {
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

export default fetchUsername; 