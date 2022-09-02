import React from "react";
import PlayIcon from "../components/PlayIcon";
import PauseIcon from "../components/PauseIcon";
import VolumeOnIcon from "../components/VolumeOnIcon";
import VolumeOffIcon from "../components/VolumeOffIcon";
import NextIcon from "../components/NextIcon";
import BackIcon from "../components/BackIcon";
import styled from "styled-components";

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
      padding: 10px;
      width: 320px;
      height: 320px;
      border-radius: 5px;
      background-color: #111111;
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
      width: 90px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      div {
        cursor: pointer;
      }
    }
  }
`;

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
  loading,
  tracks,
}) => {
  const audioElement = React.useRef(null);

  React.useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
    const timeout = setTimeout(() => {
      setDuration(audioElement.current.duration);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentSong]);

  function timeCalculation(seconds) {
    const m = Math.floor((seconds % 3600) / 60).toString();
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return m + ":" + s;
  }

  console.log(duration);

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
        <div className="controls">
          <div
            onClick={() => {
              if (tracks.indexOf(currentSong) > 0) {
                setCurrentSong(tracks[tracks.indexOf(currentSong) - 1]);
                setSecondsElapsed(0);
                setDuration(audioElement.current.duration);
              }
            }}
          >
            <BackIcon />
          </div>
          <div
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <div
            onClick={() => {
              if (tracks.indexOf(currentSong) < tracks.length - 1) {
                setCurrentSong(tracks[tracks.indexOf(currentSong) + 1]);
                setSecondsElapsed(0);
                setDuration(audioElement.current.duration);
              }
            }}
          >
            <NextIcon />
          </div>
        </div>
        <audio
          // controls
          ref={audioElement}
          muted={muted}
          src={currentSong.audio}
          onTimeUpdate={() => {
            setSecondsElapsed(audioElement.current.currentTime);
          }}
          onEnded={() => {
            if (tracks.indexOf(currentSong) < tracks.length - 1) {
              setCurrentSong(tracks[tracks.indexOf(currentSong) + 1]);
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            }
          }}
        ></audio>
      </div>
    </MainContainer>
  );
};

export default Playback;
