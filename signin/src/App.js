import React from 'react';
import './App.css';
import Signin from './signin'; // Import the Signin component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Signin /> {/* Render the Signin component */}
      </header>
    </div>
  );
}

export default App;
