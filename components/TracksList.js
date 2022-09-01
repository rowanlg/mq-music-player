import React from "react";
import styled from "styled-components";

const TracksListContainer = styled.div`
  /* border: 1px solid red; */
  width: 250px;
  background-color: #111111;
  padding: 5px 30px;
  overflow-y: scroll;
  /* max-height: 80vh; */
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
  p,
  h3 {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
    opacity: 0.8;
  }
  .line-break {
    width: 140px;
    height: 1px;
    background-color: #5f5f5f;
    border-radius: 5px;
  }
`;

const TracksList = ({ tracks }) => {
  const tracksList = tracks.map((item, index) => {
    return (
      <TrackSection key={index}>
        <div className="info-container">
          <div className="image-container">
            <img src={item.image} alt="image" />
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
          </div>
          <div className="text-container">
            <h3>{item.name}</h3>
            <p>{item.release}</p>
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
