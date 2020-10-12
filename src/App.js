import React, { useEffect } from "react"
import './App.css';
import keyMap from './keyMap.js';
import Key from './components/Key';

function App() {

  useEffect(() => {
    window.addEventListener("keydown", stopSounds)
    //window.addEventListener("keyup", handleKeyUp)
    
  }, [])

  const stopSounds = e => {
    if (true) {
      let sound = document.querySelectorAll('audio');
      console.log(e.key);
      if (e.key === ']') {

        sound.forEach(element => {
          element.currentTime = 0;
          element.pause();
        });
      }
    }
  }

  return (
    <div>
      <h1><span role="img" aria-label="keyboard radio speaker">🎹📻🔈</span></h1>
      <h1>Keyboard Soundbox</h1>
      <div keymap={keyMap} className="App">
        {keyMap.map(props => (
          <Key
            key={props.letter}
            letter={props.letter}
            src={props.src}
            id={props.letter}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
