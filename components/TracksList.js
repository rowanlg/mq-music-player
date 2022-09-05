import React from "react";
import styled from "styled-components";
import { SettingsIcon, XIcon } from "./Icons";

const TracksList = ({
  tracks,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  setSecondsElapsed,
}) => {
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const tracksList = tracks.map((item, index) => {
    const playIcon = () => {
      return (
        <svg
          className="play-icon"
          style={tracks.indexOf(currentSong) === index ? { opacity: 1 } : {}}
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4663 6.71486C15.9306 7.45457 15.9306 9.54543 14.4663 10.2851L2.90182 16.1273C1.57155 16.7993 0 15.8326 0 14.3422L0 2.65782C0 1.16744 1.57155 0.200652 2.90182 0.872679L14.4663 6.71486Z"
            fill="white"
          />
        </svg>
      );
    };

    const pauseIcon = () => {
      return (
        <svg
          style={{ opacity: 1 }}
          width="15"
          height="18"
          viewBox="0 0 11 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="2"
            y1="2"
            x2="2"
            y2="12"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="9"
            y1="2"
            x2="9"
            y2="12"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    };
    return (
      <TrackSection key={index}>
        <div className="info-container">
          <div
            className="image-container"
            onClick={() => {
              setCurrentSong(tracks[index]);
              setSecondsElapsed(0);
              if (currentSong == tracks[index]) {
                setIsPlaying(!isPlaying);
              } else {
                setIsPlaying(true);
              }
            }}
          >
            <img
              style={
                tracks.indexOf(currentSong) == index ? { opacity: 0.5 } : {}
              }
              src={item.image}
              alt="image"
            />
            {tracks.indexOf(currentSong) == index
              ? isPlaying
                ? pauseIcon()
                : playIcon()
              : playIcon()}
          </div>
          <div className="text-container">
            <h3>{item.name}</h3>
            <p>
              {item.release} · {item.year}
            </p>
          </div>
        </div>
        {index + 1 === tracks.length ? null : <div className="line-break" />}
      </TrackSection>
    );
  });
  return (
    <TracksListContainer>
      <div
        className="options-section"
        style={optionsOpen ? { width: "330px", opacity: 1 } : {}}
      >
        <p>These are your options</p>
        <div
          onClick={() => {
            setOptionsOpen(false);
          }}
        >
          <XIcon />
        </div>
      </div>
      <div className="title-section">
        <h1>Library</h1>
        <div
          onClick={() => {
            setOptionsOpen(true);
          }}
        >
          <SettingsIcon />
        </div>
      </div>
      {tracksList}
    </TracksListContainer>
  );
};

export default TracksList;

//////// STYLES ////////

const TracksListContainer = styled.div`
  /* border: 1px solid red; */
  position: relative;
  max-width: 500px;
  width: 80vw;
  height: 100%;
  max-height: 330px;
  background-color: #000000;
  padding: 5px 30px;
  overflow-y: scroll;
  border-radius: 5px;
  border: 1px solid #1e1e1e;
  margin-top: 2vh;
  @media screen and (min-width: 768px) {
    width: 330px;
    max-height: 650px;
  }
  @media screen and (max-height: 843px) {
    height: 155px;
  }
  .options-section {
    position: fixed;
    width: 0;
    opacity: 0;
    height: 650px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 50;
    svg {
      cursor: pointer;
    }
  }

  .title-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    svg {
      cursor: pointer;
      /* z-index: 51; */
    }
  }
`;

const TrackSection = styled.div`
  .info-container {
    display: flex;
    flex-direction: row;
    /* width: 200px; */
  }
  .text-container {
    /* margin: auto; */
  }
  .image-container {
    margin: auto 20px auto 0px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    cursor: pointer;
    svg {
      grid-area: 1 / 1 / 2 / 2;
      z-index: 40;
      margin: auto;
      opacity: 0;
      transition: all 0.3s linear;
    }
    img {
      grid-area: 1 / 1 / 2 / 2;
      transition: all 0.6s linear;
    }
  }
  .image-container:hover {
    transition: all 1s linear;
    img {
      opacity: 50%;
    }
    svg {
      opacity: 100%;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  h3 {
    margin-bottom: 0;
    font-size: 16px;
  }
  p {
    margin-top: 0;
    opacity: 0.8;
    font-size: 14px;
  }
  .line-break {
    width: 180px;
    height: 1px;
    background-color: #5f5f5f;
    border-radius: 5px;
  }
`;
