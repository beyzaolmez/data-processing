import React, { useState, useRef } from 'react';

const VideoControls = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePause = () => {
        const video = videoRef.current;
        video.pause();
        setCurrentTime(video.currentTime);
    };

    const handleReplay = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play();
            setCurrentTime(0);
        }
    };

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
        }
    };   

    return (
        <div>
            <video ref={videoRef} src={videoSrc} controls style={{ height: '200px', width: '400px' }}></video>
            <button type="button" onClick={handlePlay}>Play</button> {}
            <button type="button" onClick={handlePause}>Pause</button>
            <button type="button" onClick={handleReplay}>Replay</button>
            <p>Paused at: {currentTime} seconds</p>
        </div>
    );
};

export default VideoControls;
