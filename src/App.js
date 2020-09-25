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

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function App() {
  const classes = useStyles();
  const [videoFilePath, setVideoPath] = useState(null);
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    playingTrainer: false,
    playingTrainee: false, 
    muted: false,
    playBoth: false,
    volume: 0.5,
    playBackRate: 1.0,
    played: 0,
    seeking: false
  });

  const {playingTrainer, playingTrainee, played, muted, playBoth, volume, playBackRate, seeking} = state;

  const handleVideoUpload = (event) => {
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };

  const trainerRef = useRef(null);
  const traineeRef = useRef(null);
  const playerContainerRef = useRef(null);
  const trainerControlsRef = useRef(null);

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

 const handleVolumeSeekUp = (e, newValue) => {
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
//            FOR FULLSCREEN
/*******************************************/
const toggleFullScreen = () => {
  screenfull.toggle(playerContainerRef.current);
}

/*******************************************/
//         FOR Progress slider
/*******************************************/
const handleProgress = (changeState) => {
  if (count > 1) {
    trainerControlsRef.current.style.visibility = "hidden";
    count = 0;
  }
  if (trainerControlsRef.current.style.visibility === "visible") {
    count += 1;
  }
  if (!state.seeking) {
    setState({ ...state, ...changeState });
  }
};

const handleSeekChange = (e, newValue) => {
  console.log({ newValue });
  setState({ ...state, played: parseFloat(newValue / 100) });
};

const handleSeekMouseDown = (e) => {
  setState({ ...state, seeking: true });
};

const handleSeekMouseUp = (e, newValue) => {
  console.log({ value: e.target });
  setState({ ...state, seeking: false });

  trainerRef.current.seekTo(newValue / 100, "fraction");
};

/*******************************************/
//                FOR Timer
/*******************************************/
const currentTime = trainerRef && trainerRef.current ? trainerRef.current.getCurrentTime() : "00:00";
const duration = trainerRef && trainerRef.current ? trainerRef.current.getDuration() : "00:00";

const elapsedTime =
timeDisplayFormat === "normal"
  ? format(currentTime)
  : `-${format(duration - currentTime)}`;
  
const totalDuration = format(duration);

const handleChangeDisplayFormat = () => {
  setTimeDisplayFormat(timeDisplayFormat === 'normal' ? 'remaining' : 'normal');
}


// const hanldeMouseLeave = () => {
//   trainerRef.current.style.visibility = "hidden";
//   count = 0;
// };

const handleMouseMove = () => {
  trainerControlsRef.current.style.visibility = "visible";
  count = 0;
}

  return (
    <div className="body">
      <div className="upload">
        <input type="file" name="video" class="video__upload" onChange={handleVideoUpload}/>
      </div>
      <div className="main__container">
        <div className="video__container">
          <div 
            ref={playerContainerRef}  
            className={classes.playerWrapper}
            onMouseMove = {handleMouseMove}
          >
            <ReactPlayer 
                ref={trainerRef}
                url={myVideo}
                height='100%'
                width='100%'
                playing = {playingTrainer}
                muted={muted}
                volume={volume}
                playbackRate = {playBackRate}
                onProgress={handleProgress}
            />
            
            <Player 
              ref = {trainerControlsRef}
              onPlayPause={handlePlayTrainer}
              playing = {playingTrainer}
              onRewind={handleRewindTrainer}
              onFastForward = {handleFastForwardTrainer}
              muted={muted}
              onMute={handleMute}
              onVolumeChange={handleVolumeChange}
              onVolumeSeekUp={handleVolumeSeekUp}
              volume={volume}
              playBackRate={playBackRate}
              onPlayBackRateChange = {handlePlayBackRateChange}
              onToggleFullScreen = {toggleFullScreen}
              played={played}
              onSeek={handleSeekChange}
              onSeekMouseDown={handleSeekMouseDown}
              onSeekMouseUp={handleSeekMouseUp}
              elaspedTime={elapsedTime}
              totalDuration={totalDuration}
              onChangeDisplayFormat={handleChangeDisplayFormat}
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

// https://www.youtube.com/watch?v=Y-OLcnr8eNo - 26.52