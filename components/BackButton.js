import React from "react";
import { BackIcon } from "./Icons";

const BackButton = ({
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
          if (shuffledTracks.indexOf(currentSong) > 0) {
            setCurrentSong(
              shuffledTracks[shuffledTracks.indexOf(currentSong) - 1]
            );
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          } else {
            setCurrentSong(shuffledTracks[tracks.length - 1]);
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          }
        } else {
          if (tracks.indexOf(currentSong) > 0) {
            setCurrentSong(tracks[tracks.indexOf(currentSong) - 1]);
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          } else {
            setCurrentSong(tracks[tracks.length - 1]);
            setSecondsElapsed(0);
            setDuration(audioElement.current.duration);
          }
        }
      }}
    >
      <BackIcon />
    </div>
  );
};

export default BackButton;
