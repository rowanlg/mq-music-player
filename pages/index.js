import React from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import TracksList from "../components/TracksList";
import PlayIcon from "../components/PlayIcon";
import PauseIcon from "../components/PauseIcon";
import VolumeOnIcon from "../components/VolumeOnIcon";
import VolumeOffIcon from "../components/VolumeOffIcon";
import NextIcon from "../components/NextIcon";
import BackIcon from "../components/BackIcon";

const Container = styled.div`
  padding: 0 2rem;
  max-height: 100vh;
  height: 100vh;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "side main main main"
    "side main main main"
    "side main main main"
    "side main main main";

  .side-container {
    grid-area: side;
  }
  .main-container {
    grid-area: main;
    display: flex;
    justify-content: center;
    align-items: center;
    .main-content {
      /* margin: auto; */
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
        padding: 10px;
        border-radius: 5px;
        background-color: #111111;
        img {
          width: 300px;
          height: 300px;
          border-radius: 5px;
        }
      }
      .progress-container {
        display: flex;
        p {
          font-size: 14px;
          margin: 12px 10px 0 0;
        }
        .progress-bar {
          position: relative;
          margin: 20px auto;
          width: 250px;
          height: 2px;
          border-radius: 2px;
          background-color: white;
          .progress-ball {
            position: absolute;
            top: -4px;
            width: 11px;
            height: 11px;
            border-radius: 10px;
            background-color: white;
          }
        }
        .volume-icon {
          margin: -19px 0 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .controls {
        margin: auto;
        width: 90px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

export default function Home() {
  const tracks = [
    {
      name: "Home",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/1.%20Home.wav?alt=media&token=476ac8d4-3640-4ae7-a575-6470fd50c18a",
    },
    {
      name: "Sorry",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/2.%20Sorry.wav?alt=media&token=170cb231-7d83-408b-8514-61ec49d1e584",
    },
    {
      name: "Numa",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/3.%20Numa.wav?alt=media&token=813c2bd2-d2ee-479c-b444-e74e2fbdaf1e",
    },
    {
      name: "Weirder",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/4.%20Weirder.wav?alt=media&token=a2553f46-775b-4f71-92f5-8fc84167bc60",
    },
    {
      name: "Trains",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/5.%20Trains.wav?alt=media&token=24007e44-b1c4-4129-8bd5-7c9b3ae8c114",
    },
    {
      name: "Fly",
      release: "Home EP",
      image:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/Maha_Quest_Home_EP_Artwork.jpg?alt=media&token=db900d0a-16c5-4278-afea-791877615e22",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/maha-quest-music-player.appspot.com/o/6.%20Fly.wav?alt=media&token=36b987ad-8894-456c-939e-a8d971f86498",
    },
  ];

  const audioElement = React.useRef(null);
  const [currentSong, setCurrentSong] = React.useState(tracks[3]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(180);
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [muted, setMuted] = React.useState(false);

  React.useEffect(() => {
    setDuration(audioElement.current.duration);
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
  }, [isPlaying, currentSong]);

  function timeCalculation(seconds) {
    const m = Math.floor((seconds % 3600) / 60).toString();
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return m + ":" + s;
  }

  return (
    <Container>
      <Head>
        <title>Maha Quest</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <div className="side-container">
          <Image src="/logo.png" alt="logo" width="200" height="200" />
          <TracksList
            tracks={tracks}
            setIsPlaying={setIsPlaying}
            setCurrentSong={setCurrentSong}
          />
        </div>
        <div className="main-container">
          <div className="main-content">
            <div className="image-container">
              <img src={currentSong.image} alt="image" />
            </div>
            <h4>{currentSong.name}</h4>
            <p>{currentSong.release}</p>
            <p>Maha Quest</p>
            <div className="progress-container">
              <p>{timeCalculation(secondsElapsed)}</p>
              <div className="progress-bar">
                <div
                  className="progress-ball"
                  style={{ left: `${(240 / duration) * secondsElapsed}px` }}
                />
              </div>
              <div
                className="volume-icon"
                onClick={() => {
                  setMuted(!muted);
                }}
              >
                {!muted ? <VolumeOnIcon /> : <VolumeOffIcon />}
              </div>
            </div>
            <div className="controls">
              <div
                onClick={() => {
                  // setCurrentSong(tracks[tracks.indexOf(currentSong) - 1]);
                }}
              >
                <BackIcon />
              </div>
              <div
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </div>
              <div>
                <NextIcon />
              </div>
            </div>
            <audio
              ref={audioElement}
              controls
              muted={muted}
              src={currentSong.audio}
              onTimeUpdate={() => {
                setSecondsElapsed(audioElement.current.currentTime);
              }}
            ></audio>
          </div>
        </div>
      </Main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </Container>
  );
}
