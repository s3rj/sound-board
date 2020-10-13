import React, { useEffect } from "react"
import './Key.css';

const Key = props => {

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        window.addEventListener("mouseDown", handleClick)
    }, )

    const handleKeyDown = e => {
        if (e.key === props.letter.toLowerCase()) {
            let sound = document.getElementById("audio"+props.letter);
            let keyDiv = document.getElementById(props.letter);
            console.log(e.key);
            // a placeholder, ~this/props
            if (e.key === props.letter.toLowerCase()) {
                console.log(props);
                sound.currentTime = 0;
                keyDiv.className = 'audioPlaying';
                sound.play();
            }
        }
    }

    const handleKeyUp = e => {
        if (e.key === props.letter.toLowerCase()) {
            //let keyDiv = document.getElementById(props.letter);
            console.log(e.key);
            
            if (e.key === props.letter.toLowerCase()) {
                //keyDiv.className = '';
            }
        }
    }

    const handleClick = e => {
        let sound = document.getElementById("audio"+props.letter);
        sound.currentTime = 0;
        sound.play();
        console.log(props)
    }

    const handlePlay = e => {
        let keyDiv = document.getElementById(props.letter);
        keyDiv.className = 'audioPlaying';
    }

    const handleEnded = e => {
        let keyDiv = document.getElementById(props.letter);
        keyDiv.className = '';
    }

    return (
        <div onClick={handleClick} id = {props.letter}>
            <p>{props.letter}</p>
            <audio 
                onEnded = {handleEnded}
                onPlay = {handlePlay}
                media-player="audioPlayer"
                preload="auto"
                crossOrigin="anonymous" className='clip'
                id={"audio"+props.letter} src={process.env.PUBLIC_URL + '/sounds/' + props.src} key={props.letter} >audio</audio>
        </div>
    );
}

export default Key