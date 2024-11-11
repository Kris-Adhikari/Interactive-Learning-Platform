import React, { useRef } from 'react';
import './VideoPlayer.css';

function VideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);

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
