import React, { useState } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import myVideo from "./video_file/1.mp4";



function App() {

  const [videoFilePath, setVideoPath] = useState(null);

  const handleVideoUpload = (event) => {
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="body">
      <div className="upload">
        <input type="file" name="video" class="video__upload" onChange={handleVideoUpload}/>
      </div>
      <div className="main__container">
        <div className="video__container">
          <div className="video__canvas">
            <ReactPlayer 
                playing url={myVideo}
                height='100%'
                width='100%'
                controls='true'
            />
          </div>
          <div className="video__canvas">
          <ReactPlayer 
                url={videoFilePath} 
                height='100%'
                width='100%'
                controls='true'
            />
          </div>
        </div>
        <div className="score__contaner">
          <div>
            <h1>Score</h1>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="green" stroke-width="5" fill="white" />
            </svg>
            <p>File: {videoFilePath}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
