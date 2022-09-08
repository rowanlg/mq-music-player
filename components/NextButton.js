import React from "react";
import { NextIcon } from "./Icons";

const NextButton = ({
  isShuffled,
  shuffledTracks,
  currentSong,
  setCurrentSong,
  setDuration,
  setSecondsElapsed,
  audioElement,
  finalTrackList,
}) => {
  return (
    <div
      onClick={() => {
        if (isShuffled) {
          if (shuffledTracks.indexOf(currentSong) < finalTrackList.length - 1) {
            setCurrentSong(
              shuffledTracks[shuffledTracks.indexOf(currentSong) + 1]
            );
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          } else {
            setCurrentSong(shuffledTracks[0]);
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          }
        } else {
          if (finalTrackList.indexOf(currentSong) < finalTrackList.length - 1) {
            setCurrentSong(
              finalTrackList[finalTrackList.indexOf(currentSong) + 1]
            );
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          } else {
            setCurrentSong(finalTrackList[0]);
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          }
        }
      }}
    >
      <NextIcon />
    </div>
  );
};

export default NextButton;
