import React from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import {
  PlayIcon,
  PauseIcon,
  VolumeOnIcon,
  VolumeOffIcon,
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
  const progressBar = React.useRef(null);
  const volumeBar = React.useRef(null);
  const [shuffledTracks, setShuffledTracks] = React.useState([]);
  const [volumeShow, setVolumeShow] = React.useState(false);

  React.useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
    const timeout = setTimeout(() => {
      setDuration(audioElement.current.duration);
      // setDuration(222);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentSong]);

  React.useEffect(() => {
    setShuffledTracks(
      [...tracks].sort(function (a, b) {
        return 0.5 - Math.random();
      })
    );
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
          <div className="timing-container">
            <p>{timeCalculation(secondsElapsed)}</p>
          </div>
          {/* <div className="progress-bar" ref={progressRef}>
            <div
              className="progress-ball"
              style={{ left: `${(250 / duration) * secondsElapsed}px` }}
            />
          </div> */}
          <div className="progress-bar">
            <input
              className="progress-bar-input"
              type="range"
              defaultValue="0"
              min={0}
              max={duration}
              ref={progressBar}
              onChange={() => {
                if (muted) {
                  setMuted(false);
                }
                audioElement.current.currentTime = progressBar.current.value;
              }}
            />
          </div>
          <div className="volume-container">
            <div
              className="mouse-over-container"
              onMouseEnter={() => {
                setVolumeShow(true);
              }}
              onMouseLeave={() => {
                setVolumeShow(false);
              }}
            >
              <div
                className="volume-icon"
                onClick={() => {
                  setMuted(!muted);
                  setVolumeShow(false);
                  if (muted) {
                    volumeBar.current.value = 1;
                  } else {
                    volumeBar.current.value = 0;
                  }
                }}
              >
                {!muted ? <VolumeOnIcon /> : <VolumeOffIcon />}
              </div>
              <input
                className="volume-bar"
                type="range"
                defaultValue="1"
                min={0}
                max={1}
                step={0.01}
                ref={volumeBar}
                orient="vertical"
                onChange={() => {
                  audioElement.current.volume = volumeBar.current.value;
                  if (audioElement.current.volume == 0) {
                    setMuted(true);
                  } else {
                    setMuted(false);
                  }
                }}
                style={volumeShow ? { height: "100px", opacity: 1 } : {}}
                onMouseLeave={() => {
                  setVolumeShow(false);
                }}
              />
            </div>
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
          // src="https://docs.google.com/uc?export=download&id=1ykJEHpKls8QyKdfl9x-euv1hrlCNOHL-"
          controlsList="nodownload"
          onTimeUpdate={() => {
            setSecondsElapsed(audioElement.current.currentTime);
            progressBar.current.value = audioElement.current.currentTime;
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
    /* transition: all 5s ease; */
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
      margin: auto;
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
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      width: 380px;
      .timing-container {
        /* border: 1px solid red; */
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 14px;
          /* margin: 14px 10px 0 0; */
        }
      }
      .volume-container {
        /* border: 1px solid red; */
        margin: -18px 0 0 7px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .volume-bar {
        transition: all 1s ease;
        position: absolute;
        right: 13px;
        bottom: 35px;
        height: 0px;
        opacity: 0;
        width: 10px;
        cursor: pointer;
        writing-mode: bt-lr;
        -webkit-appearance: slider-vertical;
        z-index: 5;
        /* display: none; */
      }
      .volume-icon {
        z-index: 10;
      }
      .progress-bar {
        input[type="range"] {
          -webkit-appearance: none;
          /* overflow: hidden; */
          margin: 18px 0;
          width: 275px;
          border-radius: 5px;
          /* background: #9a905d; */
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #a5a5a5;
          border-radius: 5px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-webkit-slider-thumb {
          height: 16px;
          width: 16px;
          border-radius: 10px;
          background: #ffffff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -4px;
        }
        input[type="range"]:focus::-webkit-slider-runnable-track {
          background: #a5a5a5;
        }
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #a5a5a5;
          border-radius: 5px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 10px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]::-ms-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          border-width: 16px 0;
          color: transparent;
        }
        input[type="range"]::-ms-fill-lower {
          background: #a5a5a5;
          border: 0.2px solid #010101;
          border-radius: 5px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type="range"]::-ms-fill-upper {
          background: #a5a5a5;
          border: 0.2px solid #010101;
          border-radius: 5px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type="range"]::-ms-thumb {
          height: 16px;
          width: 16px;
          border-radius: 10px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]:focus::-ms-fill-lower {
          background: #a5a5a5;
        }
        input[type="range"]:focus::-ms-fill-upper {
          background: #a5a5a5;
        }
      }
    }
    .controls {
      margin: auto;
      width: 140px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: -10px;
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
