import React from 'react';
import './styles/App.css';
import Streak from './components/Streak';

function App() {
  return (
    <div className="App">
      <h1>Duolingo Streak</h1>
      {/* Render the Streak component */}
      <Streak />
    </div>
  );
}

export default App;
