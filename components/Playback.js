import React from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMidIcon,
  VolumeLowIcon,
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
  finalTrackList,
  repeatOn,
  setRepeatOn,
}) => {
  const audioElement = React.useRef(null);
  const progressBar = React.useRef(null);
  const volumeBar = React.useRef(null);
  const [shuffledTracks, setShuffledTracks] = React.useState([]);
  const [volumeShow, setVolumeShow] = React.useState(false);
  const [volumeValue, setVolumeValue] = React.useState(1);

  ////////// Set audio element to play and load duration /////////
  React.useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
    const timeout = setTimeout(() => {
      setDuration(audioElement.current.duration);
      // setDuration(222);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isPlaying, currentSong]);

  ////////// Set Shuffled tracks //////////
  React.useEffect(() => {
    setShuffledTracks(
      [...finalTrackList].sort(function (a, b) {
        return 0.5 - Math.random();
      })
    );
  }, [isShuffled]);

  ////////// Seconds to minutes & seconds //////////
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
                  if (muted) {
                    setMuted(false);
                    setVolumeValue(1);
                    volumeBar.current.value = 1;
                    audioElement.current.volume = 1;
                  } else {
                    setMuted(true);
                    setVolumeValue(0);
                    volumeBar.current.value = 0;
                    audioElement.current.volume = 0;
                  }
                }}
              >
                {muted ? (
                  <VolumeOffIcon />
                ) : volumeValue > 0.7 ? (
                  <VolumeHighIcon />
                ) : volumeValue > 0.4 ? (
                  <VolumeMidIcon />
                ) : (
                  <VolumeLowIcon />
                )}
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
                  setVolumeValue(volumeBar.current.value);
                  if (audioElement.current.volume == 0) {
                    setMuted(true);
                  } else {
                    setMuted(false);
                  }
                  // setVolumeValue(volumeBar.current.value);
                  // audioElement.current.volume = volumeValue;
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
          <div
            style={repeatOn ? { opacity: 1 } : { opacity: 0.6 }}
            className="repeat-button"
            onClick={() => {
              setRepeatOn(!repeatOn);
            }}
          >
            <RepeatIcon />
          </div>
          <BackButton
            isShuffled={isShuffled}
            shuffledTracks={shuffledTracks}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setDuration={setDuration}
            tracks={tracks}
            secondsElapsed={secondsElapsed}
            setSecondsElapsed={setSecondsElapsed}
            audioElement={audioElement}
            finalTrackList={finalTrackList}
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
            setSecondsElapsed={setSecondsElapsed}
            audioElement={audioElement}
            finalTrackList={finalTrackList}
          />
          <div
            className="shuffle-button"
            onClick={() => {
              setIsShuffled(!isShuffled);
              // console.log(isShuffled);
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
            if (repeatOn) {
              if (isShuffled) {
                setCurrentSong(
                  shuffledTracks[
                    Math.floor(Math.random() * shuffledTracks.length)
                  ]
                );
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
  align-items: flex-start;
  .main-content {
    text-align: center;
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
      @media screen and (min-width: 768px) {
        width: 330px;
        height: 330px;
      }
      margin: auto;
      padding: 15px;
      width: 250px;
      height: 250px;
      border-radius: 5px;
      background-color: #000000;
      border: 1px solid #1e1e1e;
      img {
        width: 220px;
        height: 220px;
        border-radius: 5px;
        /* border: 1px solid #1e1e1e; */
        @media screen and (min-width: 768px) {
          width: 300px;
          height: 300px;
        }
      }
    }
    .progress-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      @media screen and (min-width: 400px) {
        width: 380px;
      }
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
        margin: -16px 0 0 10px;
        width: 40px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .volume-bar {
        transition: all 1s ease;
        position: absolute;
        right: 33px;
        bottom: 35px;
        height: 0px;
        opacity: 0;
        width: 10px;
        cursor: pointer;
        writing-mode: bt-lr;
        -webkit-appearance: slider-vertical;
        /* appearance: slider-vertical; */
        z-index: 5;
        background: #a5a5a5;
        /* display: none; */
      }
      .volume-icon {
        z-index: 10;
      }
      .progress-bar {
        input[type="range"] {
          @media screen and (min-width: 768px) {
            width: 275px;
          }
          -webkit-appearance: none;
          appearance: none;
          width: 50vw;
          max-width: 225px;
          border-radius: 5px;
          cursor: pointer;
          background: transparent;
        }
        input[type="range"]:focus {
          outline: none;
        }

        /* Chrome and Safari */
        input[type="range"]::-webkit-slider-runnable-track {
          background-color: #a5a5a5;
          border-radius: 5px;
          height: 8.4px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -4px;
          height: 16px;
          width: 16px;
          border-radius: 10px;
          background: #ffffff;
          /* cursor: pointer; */
        }
        input[type="range"]:focus::-webkit-slider-thumb {
          /* outline: 2px solid #3093cb; */
          height: 18px;
          width: 18px;
          margin-top: -5px;
        }
        input[type="range"]:focus::-webkit-slider-runnable-track {
          background: #cacaca;
        }

        /* Firefox */
        input[type="range"]::-moz-range-track {
          background-color: #a5a5a5;
          border-radius: 5px;
          height: 8.4px;
        }
        input[type="range"]::-moz-range-thumb {
          border: none;
          margin-top: -4px;
          height: 16px;
          width: 16px;
          border-radius: 10px;
          background: #ffffff;
        }
        input[type="range"]:focus::-moz-range-track {
          background: #cacaca;
        }

        input[type="range"]:focus::-moz-range-thumb {
          height: 18px;
          width: 18px;
          margin-top: -5px;
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
