import React from "react";
import { BackIcon } from "./Icons";

const BackButton = ({
  isShuffled,
  shuffledTracks,
  currentSong,
  setCurrentSong,
  setDuration,
  secondsElapsed,
  setSecondsElapsed,
  audioElement,
  finalTrackList,
}) => {
  return (
    <div
      onClick={() => {
        if (isShuffled) {
          if (secondsElapsed > 10) {
            setSecondsElapsed(0);
            audioElement.current.currentTime = 0;
            setDuration(audioElement.current.duration);
          } else {
            if (shuffledTracks.indexOf(currentSong) > 0) {
              setCurrentSong(
                shuffledTracks[shuffledTracks.indexOf(currentSong) - 1]
              );
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            } else {
              setCurrentSong(shuffledTracks[finalTrackList.length - 1]);
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            }
          }
        } else {
          if (secondsElapsed > 10) {
            setSecondsElapsed(0);
            audioElement.current.currentTime = 0;
            setDuration(audioElement.current.duration);
          } else {
            if (finalTrackList.indexOf(currentSong) > 0) {
              setCurrentSong(
                finalTrackList[finalTrackList.indexOf(currentSong) - 1]
              );
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            } else {
              setCurrentSong(finalTrackList[finalTrackList.length - 1]);
              setSecondsElapsed(0);
              setDuration(audioElement.current.duration);
            }
          }
        }
      }}
    >
      <BackIcon />
    </div>
  );
};

export default BackButton;
