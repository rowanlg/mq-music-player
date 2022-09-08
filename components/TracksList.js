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
  finalTrackList,
  setFinalTrackList,
}) => {
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [releaseOptions, setReleaseOptions] = React.useState([]);
  const [filterCount, setFilterCount] = React.useState(0);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [filterType, setFilterType] = React.useState("");
  const [filteredTracks, setFilteredTracks] = React.useState([]);

  //////// Filter the tracks ///////
  const filteredTrackList = tracks
    .map((item) => item)
    .filter((value) => {
      if (filterType == "releases") {
        switch (releaseOptions.length) {
          case 0:
            return value.release;
          case 1:
            return value.release == releaseOptions[0];
          case 2:
            return (
              value.release == releaseOptions[0] ||
              value.release == releaseOptions[1]
            );
          case 3:
            return (
              value.release == releaseOptions[0] ||
              value.release == releaseOptions[1] ||
              value.release == releaseOptions[2]
            );
          case 4:
            return (
              value.release == releaseOptions[0] ||
              value.release == releaseOptions[1] ||
              value.release == releaseOptions[2] ||
              value.release == releaseOptions[3]
            );
          case 5:
            return (
              value.release == releaseOptions[0] ||
              value.release == releaseOptions[1] ||
              value.release == releaseOptions[2] ||
              value.release == releaseOptions[3] ||
              value.release == releaseOptions[4]
            );
        }
      } else {
        switch (releaseOptions.length) {
          case 0:
            return value.year;
          case 1:
            return value.year == releaseOptions[0];
          case 2:
            return (
              value.year == releaseOptions[0] || value.year == releaseOptions[1]
            );
          case 3:
            return (
              value.year == releaseOptions[0] ||
              value.year == releaseOptions[1] ||
              value.year == releaseOptions[2]
            );
          case 4:
            return (
              value.year == releaseOptions[0] ||
              value.year == releaseOptions[1] ||
              value.year == releaseOptions[2] ||
              value.year == releaseOptions[3]
            );
          case 5:
            return (
              value.year == releaseOptions[0] ||
              value.year == releaseOptions[1] ||
              value.year == releaseOptions[2] ||
              value.year == releaseOptions[3] ||
              value.year == releaseOptions[4]
            );
        }
      }
    });

  console.log("filteredTrackList: ", filteredTrackList);
  console.log("Final tracklist: ", finalTrackList);

  /////// Set filter on if options are selected ///////
  React.useEffect(() => {
    if (filterCount > 0) {
      setIsFiltered(true);
      setFilteredTracks(filteredTrackList);
    } else {
      setIsFiltered(false);
    }
  }, [filterCount]);

  /////// Set final tracklist to filtered or unfiltered ///////
  React.useEffect(() => {
    setFinalTrackList(isFiltered ? filteredTracks : tracks);
  }, [isFiltered, filteredTracks]);

  ////////// Items in tracklist //////////
  const tracksList = finalTrackList.map((item, index) => {
    const playIcon = () => {
      return (
        <svg
          className="play-icon"
          style={
            finalTrackList.indexOf(currentSong) === index ? { opacity: 1 } : {}
          }
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
      <TrackSection
        key={index}
        style={optionsOpen ? { filter: "blur(3px)" } : {}}
      >
        <div className="info-container">
          <div
            className="image-container"
            onClick={() => {
              setCurrentSong(finalTrackList[index]);
              setSecondsElapsed(0);
              if (currentSong == finalTrackList[index]) {
                setIsPlaying(!isPlaying);
              } else {
                setIsPlaying(true);
              }
            }}
          >
            <img
              style={
                finalTrackList.indexOf(currentSong) == index
                  ? { opacity: 0.5 }
                  : {}
              }
              src={item.image}
              alt="image"
            />
            {finalTrackList.indexOf(currentSong) == index
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
        {index + 1 === finalTrackList.length ? null : (
          <div className="line-break" />
        )}
      </TrackSection>
    );
  });

  ////////// Releases Options ///////////
  const uniqueReleases = tracks
    .map((item) => item.release)
    .filter((value, index, self) => self.indexOf(value) === index);
  const releases = uniqueReleases.map((item, index) => {
    return (
      <ul key={index}>
        <input
          type="checkbox"
          name={item}
          id={item}
          disabled={filterType == "years" ? "disabled" : ""}
          onChange={(event) => {
            if (event.target.checked) {
              ///// Add the release to the filter options /////
              releaseOptions.push(item);
              setFilterCount(filterCount + 1);
              setFilterType("releases");
            } else {
              ///// Remove the release from the filter options /////
              releaseOptions.splice(releaseOptions.indexOf(item), 1);
              setFilterCount(filterCount - 1);
              if (releaseOptions.length == 0) {
                setFilterType("");
              }
            }
          }}
        />
        <label
          style={
            filterType == "years"
              ? { marginLeft: "5px", color: "#acacac" }
              : { marginLeft: "5px" }
          }
          htmlFor={item}
        >
          {item}
        </label>
      </ul>
    );
  });

  ///////// Years Options /////////
  const uniqueYears = tracks
    .map((item) => item.year)
    .filter((value, index, self) => self.indexOf(value) === index);
  const years = uniqueYears.map((item, index) => {
    return (
      <ul key={index}>
        <input
          type="checkbox"
          name={item}
          id={item}
          disabled={filterType == "releases" ? "disabled" : ""}
          onChange={(event) => {
            if (filterType == "" || filterType == "years") {
              if (event.target.checked) {
                ///// Add the year to the filter options /////
                releaseOptions.push(item);
                setFilterCount(filterCount + 1);
                setFilterType("years");
              } else {
                ///// Remove the year from the filter options /////
                releaseOptions.splice(releaseOptions.indexOf(item), 1);
                setFilterCount(filterCount - 1);
                if (releaseOptions.length == 0) {
                  setFilterType("");
                }
              }
            }
          }}
        />
        <label
          style={
            filterType == "releases"
              ? { marginLeft: "5px", color: "#acacac" }
              : { marginLeft: "5px" }
          }
          htmlFor={item}
        >
          {item}
        </label>
      </ul>
    );
  });

  //////// Main JSX ////////
  return (
    <TracksListContainer style={optionsOpen ? { overflow: "hidden" } : {}}>
      <div
        className="options-section"
        style={optionsOpen ? { opacity: 1 } : { height: "0" }}
      >
        <div className="title-section">
          <h1>Options</h1>
          <div
            onClick={() => {
              setOptionsOpen(false);
            }}
          >
            <XIcon />
          </div>
        </div>
        <h3>Release</h3>
        {releases}
        <h3>Year</h3>
        {years}
      </div>
      <div
        className="title-section"
        style={optionsOpen ? { filter: "blur(3px)" } : {}}
      >
        <h1>Library</h1>
        <div
          style={optionsOpen ? { display: "none" } : { display: "block" }}
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
  position: relative;
  max-width: 500px;
  width: 80vw;
  height: 100%;
  max-height: 330px;
  background-color: #000000;
  padding: 5px 30px;
  overflow-y: scroll;
  border-radius: 8px;
  border: 1px solid #1e1e1e;
  margin-top: 2vh;
  overflow-y: scroll;
  @media screen and (min-width: 768px) {
    width: 330px;
    max-height: 650px;
    min-height: 650px;
  }
  @media screen and (max-height: 843px) and (max-width: 768px) {
    height: 155px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #cacaca;
    border: 3.5px solid transparent;
    border-radius: 8px;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar {
    width: 16px;
  }

  .options-section {
    transition: 1s all ease;
    position: fixed;
    max-width: 498px;
    width: 80vw;
    height: 100%;
    max-height: 330px;
    padding: 5px 30px;
    margin: -5px 0 0 -30px;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 50;
    overflow-y: scroll;
    svg {
      cursor: pointer;
    }
    @media screen and (min-width: 768px) {
      width: 328px;
      max-height: 648px;
    }
    @media screen and (max-height: 843px) and (max-width: 768px) {
      height: 155px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #cacaca;
      border: 3.5px solid transparent;
      border-radius: 8px;
      background-clip: padding-box;
    }
    ::-webkit-scrollbar {
      width: 16px;
    }
  }

  .title-section {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
