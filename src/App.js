import React, { useState } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import myVideo from "./video_file/1.mp4";
import { makeStyles } from "@material-ui/core/styles";
import Player from './customPlayer/Player';

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  }, 
});

function App() {
  const classes = useStyles();
  const [videoFilePath, setVideoPath] = useState(null);
  const [play, setPlay] = useState(false);

  
  const handleVideoUpload = (event) => {
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };

  function playBothVideo(){
    if(play === false && videoFilePath != null)
      setPlay(true);
    else
      setPlay(false);
  }

  return (
    <div className="body">
      <div className="upload">
        <input type="file" name="video" class="video__upload" onChange={handleVideoUpload}/>
      </div>
      <div className="main__container">
        <div className="video__container">
          <div className={classes.playerWrapper}>
            <ReactPlayer 
                url={myVideo}
                height='100%'
                width='100%'
                controls='true'
                playing = {play}
            />
            
            <Player />
          </div>
          
          <div className={classes.playerWrapper}>
          <ReactPlayer 
                url={videoFilePath} 
                height='100%'
                width='100%'
                playing = {play}
                volume='0'
                config={{
                  youtube: {
                    playerVar: {showinfo : 1}
                  }
                }}
          />
            <Player />

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
      <button class = "playBothVideo__button" onClick={playBothVideo}><b>Play Both</b></button>
    </div>
  );
}

export default App;


// https://www.youtube.com/watch?v=r6qWEteVMyM&t=1497s - 26.09 min