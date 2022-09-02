import React from "react";
import styled from "styled-components";

const TracksList = ({
  tracks,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  setSecondsElapsed,
}) => {
  const tracksList = tracks.map((item, index) => {
    return (
      <TrackSection key={index}>
        <div className="info-container">
          <div
            className="image-container"
            onClick={() => {
              setCurrentSong(tracks[index]);
              setSecondsElapsed(0);
              setIsPlaying(true);
            }}
          >
            <img
              style={
                tracks.indexOf(currentSong) == index ? { opacity: 0.5 } : {}
              }
              src={item.image}
              alt="image"
            />
            {tracks.indexOf(currentSong) == index ? (
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
            ) : (
              <>
                <svg
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
              </>
            )}
          </div>
          <div className="text-container">
            <h3>{item.name}</h3>
            <p>
              {item.release} - {item.year}
            </p>
          </div>
        </div>
        {index + 1 === tracks.length ? null : <div className="line-break" />}
      </TrackSection>
    );
  });
  return (
    <TracksListContainer>
      <h1>Library</h1>
      {tracksList}
    </TracksListContainer>
  );
};

export default TracksList;

//////// STYLES ////////

const TracksListContainer = styled.div`
  /* border: 1px solid red; */
  width: 300px;
  background-color: #000000;
  padding: 5px 30px;
  overflow-y: scroll;
  max-height: 75vh;
  border-radius: 5px;
  margin: 0;
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
      z-index: 100;
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
