import React, { useEffect, useState } from "react"
import './Key.css';

const Key = props => {
    const [isPressed, setIsPressed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    // Add effect to handle silence trigger
    useEffect(() => {
        if (props.silenceTriggered > 0) {
            setIsPlaying(false);
        }
    }, [props.silenceTriggered])

    const createAndPlaySound = () => {
        const audio = new Audio(process.env.PUBLIC_URL + '/sounds/' + props.src);
        audio.addEventListener('play', () => handlePlay());
        audio.addEventListener('ended', () => {
            handleEnded();
            audio.remove(); // Clean up the audio element when done
        });
        // Add the audio element to the DOM so it can be found by stopSounds
        document.body.appendChild(audio);
        audio.play();
    }

    const handleKeyDown = e => {
        if (e.key === props.letter.toLowerCase()) {
            setIsPressed(true);
            createAndPlaySound();
        }
    }

    const handleKeyUp = e => {
        if (e.key === props.letter.toLowerCase()) {
            setIsPressed(false);
        }
    }

    const handleMouseDown = () => {
        setIsPressed(true);
        createAndPlaySound();
    }

    const handleMouseUp = () => {
        setIsPressed(false);
    }

    const handleMouseLeave = () => {
        setIsPressed(false);
    }

    const handlePlay = () => {
        setIsPlaying(true);
    }

    const handleEnded = () => {
        setIsPlaying(false);
    }

    const getClassName = () => {
        const classes = [];
        if (isPlaying) classes.push('audioPlaying');
        if (isPressed) classes.push('keyPressed');
        return classes.join(' ');
    }

    return (
        <div 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            id={props.letter}
            className={getClassName()}
        >
            <p>{props.letter}</p>
        </div>
    );
}

export default Key