import React from "react";
import { NextIcon } from "./Icons";

const NextButton = ({
  isShuffled,
  shuffledTracks,
  currentSong,
  setCurrentSong,
  setDuration,
  setSecondsElapsed,
  tracks,
  audioElement,
}) => {
  return (
    <div
      onClick={() => {
        if (isShuffled) {
          if (shuffledTracks.indexOf(currentSong) < tracks.length - 1) {
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
    >
      <NextIcon />
    </div>
  );
};

export default NextButton;
