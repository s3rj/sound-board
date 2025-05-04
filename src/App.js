import React, { useEffect, useState } from "react"
import './App.css';
import keyMap from './keyMap.js';
import Key from './components/Key';

function App() {
  const [isSilencing, setIsSilencing] = useState(false);
  const [silenceTriggered, setSilenceTriggered] = useState(0);  // Add counter for silence triggers

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  const stopSounds = () => {
    // Stop and remove all audio elements in the document
    const sounds = document.getElementsByTagName('audio');
    // Convert to array since we'll be modifying the live HTMLCollection
    Array.from(sounds).forEach(element => {
      element.pause();
      element.remove();
    });
    setSilenceTriggered(prev => prev + 1);  // Increment counter to notify keys
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' && !e.repeat) {
      e.preventDefault(); // Prevent page scroll
      setIsSilencing(true);
      stopSounds();
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === ' ') {
      setIsSilencing(false);
    }
  }

  const handleMouseDown = () => {
    setIsSilencing(true);
    stopSounds();
  }

  const handleMouseUp = () => {
    setIsSilencing(false);
  }

  return (
    <div>
      <h1><span role="img" aria-label="keyboard radio speaker">🎹📻🔈</span></h1>
      <h1>Keyboard Soundbox</h1>
      <div className="App">
        {keyMap.map(props => (
          <Key
            key={props.letter}
            letter={props.letter}
            src={props.src}
            id={props.letter}
            silenceTriggered={silenceTriggered}
          />
        ))}
      </div>
      <div 
        className={`Panel ${isSilencing ? 'silencing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsSilencing(false)}
      >
        [SPACEBAR] silence all
      </div>
    </div>
  );
}

export default App;
