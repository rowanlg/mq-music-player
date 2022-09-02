import React from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import {
  PlayIcon,
  PauseIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  NextIcon,
  BackIcon,
  RepeatIcon,
  ShuffleIcon,
} from "./Icons";
import NextButton from "./NextButton";

const Playback = ({
  duration,
  setDuration,
  muted,
  setMuted,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  secondsElapsed,
  setSecondsElapsed,
  tracks,
  isShuffled,
  setIsShuffled,
}) => {
  const audioElement = React.useRef(null);
  const [shuffledTracks, setShuffledTracks] = React.useState([]);

  React.useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
    const timeout = setTimeout(() => {
      setDuration(audioElement.current.duration);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentSong]);

  React.useEffect(() => {
    setShuffledTracks(
      [...tracks].sort(function (a, b) {
        return 0.5 - Math.random();
      })
    );
    // console.log("TRIGGERED");
  }, [isShuffled]);

  function timeCalculation(seconds) {
    const m = Math.floor((seconds % 3600) / 60).toString();
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return m + ":" + s;
  }

  return (
    <MainContainer>
      <div
        className="main-content"
        style={currentSong == {} ? { opacity: 0 } : { opacity: 1 }}
      >
        <div className="image-container">
          <img src={currentSong.image} alt="image" />
        </div>
        <h4>{currentSong.name}</h4>
        <p>{currentSong.release}</p>
        <p>Maha Quest</p>

        {/* //////// Progress bar //////// */}
        <div className="progress-container">
          <p>{timeCalculation(secondsElapsed)}</p>
          <div className="progress-bar">
            <div
              className="progress-ball"
              style={{ left: `${(240 / duration) * secondsElapsed}px` }}
            />
          </div>
          <div
            className="volume-icon"
            onClick={() => {
              setMuted(!muted);
            }}
          >
            {!muted ? <VolumeOnIcon /> : <VolumeOffIcon />}
          </div>
        </div>

        {/* //////// Controls section //////// */}
        <div className="controls">
          <div className="repeat-button">
            <RepeatIcon />
          </div>
          <BackButton
            isShuffled={isShuffled}
            shuffledTracks={shuffledTracks}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setDuration={setDuration}
            tracks={tracks}
            setSecondsElapsed={setSecondsElapsed}
            audioElement={audioElement}
          />
          <div
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <NextButton
            isShuffled={isShuffled}
            shuffledTracks={shuffledTracks}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setDuration={setDuration}
            tracks={tracks}
            setSecondsElapsed={setSecondsElapsed}
            audioElement={audioElement}
          />
          <div
            className="shuffle-button"
            onClick={() => {
              setIsShuffled(!isShuffled);
              console.log(isShuffled);
            }}
            style={isShuffled ? { opacity: 1 } : { opacity: 0.6 }}
          >
            <ShuffleIcon />
          </div>
        </div>

        {/* //////// AUDIO COMPONENT //////// */}
        <audio
          // controls
          ref={audioElement}
          muted={muted}
          src={currentSong.audio}
          controlsList="nodownload"
          onTimeUpdate={() => {
            setSecondsElapsed(audioElement.current.currentTime);
          }}
          onEnded={() => {
            if (isShuffled) {
              setCurrentSong(tracks[Math.floor(Math.random() * tracks.length)]);
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            } else {
              if (tracks.indexOf(currentSong) < tracks.length - 1) {
                setCurrentSong(tracks[tracks.indexOf(currentSong) + 1]);
                setSecondsElapsed(0);
                setDuration(audioElement.current.duration);
              } else {
                setCurrentSong(tracks[0]);
                setSecondsElapsed(0);
                setDuration(audioElement.current.duration);
              }
            }
          }}
        />
      </div>
    </MainContainer>
  );
};

export default Playback;

const MainContainer = styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-content {
    /* margin: auto; */
    text-align: center;
    /* opacity: 0; */
    transition: all 5s ease;
    h4 {
      margin-bottom: 4px;
    }
    p {
      margin: 4px;
      font-weight: 400;
      opacity: 0.8;
    }
    svg {
      margin-top: 20px;
      cursor: pointer;
      z-index: 100;
    }
    .image-container {
      padding: 15px;
      width: 330px;
      height: 330px;
      border-radius: 5px;
      background-color: #000000;
      img {
        width: 300px;
        height: 300px;
        border-radius: 5px;
      }
    }
    .progress-container {
      display: flex;
      p {
        font-size: 14px;
        margin: 12px 10px 0 0;
      }
      .progress-bar {
        position: relative;
        margin: 20px auto;
        width: 250px;
        height: 2px;
        border-radius: 2px;
        background-color: white;
        .progress-ball {
          position: absolute;
          top: -4px;
          width: 11px;
          height: 11px;
          border-radius: 10px;
          background-color: white;
        }
      }
      .volume-icon {
        margin: -19px 0 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .controls {
      margin: auto;
      width: 140px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      div {
        cursor: pointer;
      }
      .repeat-button {
        margin-right: 10px;
      }
      .shuffle-button {
        margin-left: 10px;
      }
    }
  }
`;
