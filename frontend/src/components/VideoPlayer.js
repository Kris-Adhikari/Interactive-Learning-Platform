import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl, currentTopic }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video && video.currentTime >= video.duration - 2) {
        console.log("Video detected as completed");
        const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
        progress[currentTopic] = { ...progress[currentTopic], videoWatched: true };
        localStorage.setItem('userProgress', JSON.stringify(progress));
        
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentTopic]);

  return (
    <div className="video-player">
      <video ref={videoRef} controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
