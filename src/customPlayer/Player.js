import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { 
  Button, 
  Grid, 
  IconButton, 
  Popover, 
  Slider, 
  Tooltip, 
  Typography, 
  withStyles 
} from '@material-ui/core';
import {  
  FastForward, 
  FastRewind, 
  Fullscreen, 
  Pause, 
  PlayArrow, 
  VolumeUp 
} from '@material-ui/icons';


const useStyles = makeStyles({
    playerWrapper: {
      width: "100%",
      position: "relative",
    }, 
  
    controlsWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      zIndex: 1,
    },
  
    controlIcons: {
      color: "#777",
      fontSize: 50,
      transform: "scale(0.9)",
      "&:hover":{
        color: "#fff",
        transform: "scale(1)"
      },
    },
  
    bottomIcon: {
      color: "#999",
      "&:hover":{
        color: "#fff"
      }
    },
  
    volumeSlider: {
      width: 100,
      marginTop: 10
    }
  });
  
  function ValueLabelComponent(props: Props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  const PrettoSlider = withStyles({
    root: {
      height: 8,
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -3,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 4,
      borderRadius: 4,
    },
    rail: {
      height: 4,
      borderRadius: 4,
    },
  })(Slider);
  

export default function Player() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'playbackrate-popover' : undefined;


    return (
            <div className={classes.controlsWrapper}>
              {/* top controls */}
                <Grid container direction="row" alignItems="center" justify="space-between" style={{padding: 16}}>
                    <Grid item>
                      <Typography varient="h5" style={{color: "#fff"}}>Video Title</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handlePopover}
                        variant="text"
                        className={classes.bottomIcons}
                        style={{color: "white"}}
                      >
                        <Typography>1X</Typography>
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <Grid container direction="column reverse">
                          {[0.25, 0.5, 1, 1.5].map((rate) => (
                          <Button varient="text">
                            <Typography color="secondary">{rate}</Typography>
                          </Button>
                          ))}
                        </Grid>
                      </Popover>
                    </Grid>
                </Grid>

                {/* middle Controles */}
                
                <Grid container direaction="row" alignItems="center" justify="center">
                  <IconButton
                    aria-label = "reqind"
                    className={classes.controlIcons}
                  >
                    <FastRewind fontSize="inherit"/>
                  </IconButton>

                  <IconButton
                    aria-label = "reqind"
                    className={classes.controlIcons}
                  >
                    <PlayArrow fontSize="inherit"/>
                  </IconButton>

                  <IconButton
                    aria-label = "reqind"
                    className={classes.controlIcons}
                  >
                    <FastForward fontSize="inherit"/>
                  </IconButton>
                </Grid>

                {/* bottom controls */}
                <Grid container direction="row" justify="space-between" alignItems="center" style={{padding: 16}}>
                  <Grid item xs={12}>
                    <PrettoSlider 
                      min = {0}
                      max={100}
                      defaultValue={20}
                      ValueLabelComponent={ValueLabelComponent}
                    />
                  </Grid>

                    <Grid item>
                      <Grid container alignitems="center" direction="row">
                        {/* <IconButton className={classes.bottomIcon}>
                          <PlayArrow fontSize="medium"/>
                        </IconButton> */}

                        <IconButton className={classes.bottomIcon}>
                          <VolumeUp fontSize="medium"/>
                        </IconButton>

                        <Slider 
                          min={0}
                          max={100}
                          defaultValue={100}
                          className={classes.volumeSlider}
                        />

                        <Button varient="text" style={{color:"#fff", marginLeft: 16}}>
                          <Typography>05:05</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                    <IconButton
                      className={classes.bottomIcons}
                      style={{color: "#fff"}}
                    >
                      <Fullscreen/>
                    </IconButton>
                </Grid>
            </div>
    )
}