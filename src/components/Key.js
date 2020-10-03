import React, { useEffect } from "react"
import './Key.css';

const Key = props => {

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        //window.addEventListener("keyup", handleKeyUp)
        window.addEventListener("mouseDown", handleClick)
    }, )

    const handleKeyDown = e => {
        if (e.key === props.letter.toLowerCase()) {
            let sound = document.getElementById(props.letter);
            console.log(e.key);
            // a placeholder, ~this/props
            if(e.key === props.letter.toLowerCase()){
                console.log(props);
                sound.currentTime = 0;
                sound.play();
            }
        }
    }

    const handleClick = e => {
   
        let sound = document.getElementById(props.letter);
        sound.currentTime = 0;
        sound.play();
        console.log(props)
      }

    return (
        //pass id and src as props
        <div onClick={handleClick}>
            <p>{props.letter}</p>
            <audio media-player="audioPlayer"
            preload="auto" 
            crossOrigin="anonymous" className='clip' 
            id={props.letter} src={process.env.PUBLIC_URL+'/sounds/'+props.src} key={props.letter} >audio</audio>
        </div>
    );
}

export default Key