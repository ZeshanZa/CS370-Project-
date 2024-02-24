
import React from 'react';


const Setin = () =>{
  return (
    <div className="container mx-auto px-4">
      <div class="flex items-center justify-center h-screen">
  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" class="w-30 h-30 rounded-full" />
</div>
    <div className="text-center">
      <h4 className="mt-0">Last Name, First Name</h4>
      <p className="text-gray-600">
        <span className="bg-gray-700 text-white py-1 px-3 rounded-full text-xs">Location</span>
      </p>
    </div>
    
    <div className="mt-5">
      <form>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input type="text" id="firstname" placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input type="text" id="lastname" placeholder="lastname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-20">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="text" id="email" placeholder="Email Adress" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
          <input type="text" id="lastname" placeholder="Old Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input type="text" id="lastname" placeholder="New Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input type="text" id="lastname" placeholder="Confirm New Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="fixed inset-x-0 bottom-0 bg-gray-100">
         <div className="flex justify-center space-x-4 py-2">
        <a href="/" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Home</a>
         <a href="/matches" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Matches</a>
        <a href="/settings" className="block p-2 text-center text-gray-900 rounded hover:bg-gray-200">Settings</a>
        </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save Changes
        </button>
      </form>
    </div>
  </div>
);
};

export default Setin;
  