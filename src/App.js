import React, { useState, useRef } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import myVideo from "./video_file/1.mp4";
import { makeStyles } from "@material-ui/core/styles";
import Player from './customPlayer/Player';
import screenfull from "screenfull";

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  }, 
});

function App() {
  const classes = useStyles();
  const [videoFilePath, setVideoPath] = useState(null);
  const [state, setState] = useState({
    playingTrainer: false,
    playingTrainee: false, 
    muted: false,
    playBoth: false,
    volume: 0.5,
    playBackRate: 1.0,
  });

  const {playingTrainer, playingTrainee, muted, playBoth, volume, playBackRate} = state;

  const handleVideoUpload = (event) => {
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };

  const trainerRef = useRef(null);
  const traineeRef = useRef(null);
  const playerContainerRef = useRef(null);

  /*******************************************/
  //  For playing trainer and trainee video
  /*******************************************/
  const handlePlayTrainer = () => {
    setState({...state, playingTrainer: !playingTrainer})
  }

  const handlePlayTrainee = () => {
    setState({...state, playingTrainee: !playingTrainee})
  }

  /*******************************************/
  //     playing both video at same time
  /*******************************************/
  function playBothVideo(){
    if(playBoth === false && videoFilePath != null)
      setState({...state, playBoth: true});
    else
      setState({...state, playBoth: false});
  }

/*******************************************/
//    To handel Rewind and Fast forward
/*******************************************/
  //FOR TRAINER
  const handleRewindTrainer = () => {
    trainerRef.current.seekTo(trainerRef.current.getCurrentTime() - 5);
  }
  const handleFastForwardTrainer = () => {
    trainerRef.current.seekTo(trainerRef.current.getCurrentTime() + 5);
  }

  //FOR TRAINEE
  const handleRewindTrainee = () => {
    traineeRef.current.seekTo(traineeRef.current.getCurrentTime() - 5);
  }
  const handleFastForwardTrainee = () => {
    traineeRef.current.seekTo(traineeRef.current.getCurrentTime() + 5);
  }

/*******************************************/
//            FOR VOLUME CONTROL
/*******************************************/
 const handleMute = () => {
   setState({...state, muted: !state.muted });
 }

 const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
 };

 const handleVolumeSeekDown = (e, newValue) => {
  setState({
    ...state,
    volume: parseFloat(newValue / 100),
    muted: newValue === 0 ? true : false,
  });
 }

/*******************************************/
//            FOR PLAYBACK
/*******************************************/
const handlePlayBackRateChange = (rate) => {
  setState({...state, playBackRate: rate})
}

/*******************************************/
//            FOR PLAYBACK
/*******************************************/
const toggleFullScreen = () => {
  screenfull.toggle(playerContainerRef.current);
}

  return (
    <div className="body">
      <div className="upload">
        <input type="file" name="video" class="video__upload" onChange={handleVideoUpload}/>
      </div>
      <div className="main__container">
        <div className="video__container">
          <div ref={playerContainerRef}  className={classes.playerWrapper}>
            <ReactPlayer 
                ref={trainerRef}
                url={myVideo}
                height='100%'
                width='100%'
                playing = {playingTrainer}
                muted={muted}
                volume={volume}
                playbackRate = {playBackRate}
            />
            
            <Player 
              onPlayPause={handlePlayTrainer}
              playing = {playingTrainer}
              onRewind={handleRewindTrainer}
              onFastForward = {handleFastForwardTrainer}
              muted={muted}
              onMute={handleMute}
              onVolumeChange={handleVolumeChange}
              onVolumeSeekDown={handleVolumeSeekDown}
              volume={volume}
              playBackRate={playBackRate}
              onPlayBackRateChange = {handlePlayBackRateChange}
              onToggleFullScreen = {toggleFullScreen}
            />
          </div>
          
          <div className={classes.playerWrapper}>
          <ReactPlayer 
                ref={traineeRef}
                url={videoFilePath} 
                height='100%'
                width='100%'
                playing = {playingTrainee}
                // volume='0'
          />
            <Player 
              onPlayPause={handlePlayTrainee}
              playing = {playingTrainee}
              onRewind={handleRewindTrainee}
              onFastForward = {handleFastForwardTrainee}
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
      <button class = "playBothVideo__button" onClick={playBothVideo}><b>Play Both</b></button>
    </div>
  );
}

export default App;