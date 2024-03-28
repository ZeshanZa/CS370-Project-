import React from 'react';
import Signin from './signin'; // Adjust the path as necessary
import Setin from './setpage/page'; // Adjust the path as necessary
import SignInPageComponent from './components/SignInPageComponent';
//<Signin /> {/* Render the Signin component */}
//< Setin />{/* Render the Signin component */}
export default function Home() {
  return (
    <main className="h-[100dvh] w-screen">
      <SignInPageComponent /> {/* Render the Signin component */}
      
    
     
      
      
      {/* The rest of your page content goes here, or you can replace the existing content with the Signin component */}
    </main>
  );
}
