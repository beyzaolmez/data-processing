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
        video.currentTime = 0;
        video.play();
    };

    return (
        <div>
            <video ref={videoRef} src={videoSrc} controls></video>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReplay}>Replay</button>
            <p>Paused at: {currentTime} seconds</p>
        </div>
    );
};

export default VideoControls;
