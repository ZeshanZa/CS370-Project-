import React from 'react';
import Signin from './signin'; // Adjust the path as necessary
import Setin from './setpage/page'; // Adjust the path as necessary
//<Signin /> {/* Render the Signin component */}
//< Setin />{/* Render the Signin component */}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Signin /> {/* Render the Signin component */}
      
    
     
      
      
      {/* The rest of your page content goes here, or you can replace the existing content with the Signin component */}
    </main>
  );
}