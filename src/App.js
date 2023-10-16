import react, { useState, useRef, createRef, useEffect } from "react";
import "./App.css";
import playIcon from "./images/play1.png";
import pauseIcon from "./images/pause.png";
import SliderUnstyled from "@mui/core/SliderUnstyled";
import { styled, alpha } from "@mui/system";
import v from "./images/v.png";
import o1 from "./images/o1.png";
import n from "./images/n.png";
import g from "./images/g.png";
import o2 from "./images/o2.png";
import o3 from "./images/o3.png";
import s from "./images/s.png";
import e from "./images/e.png";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
    color: ${theme.palette.mode === "light" ? "#1a1a1a" : "#90caf9"};
    height: 4px;
    width: 90%;
    padding: 13px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    opacity: 0.75;
    &:hover {
      opacity: 1;
    }
  
    & .MuiSlider-rail {
      display: block;
      position: absolute;
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background-color: currentColor;
      opacity: 0.38;
      @media (max-width: 600px) {
        width: 96%;
      }
    }
  
    & .MuiSlider-track {
      display: block;
      position: absolute;
      height: 3px;
      border-radius: 2px;
      background-color: currentColor;
    }
  
    & .MuiSlider-thumb {
      position: absolute;
      width: 6px;
      height: 3px;
      margin-left: -6px;
      margin-top: 0px;
      box-sizing: border-box;
      border-radius: 20%;
      outline: 0;
      border: none;
      background-color: none;
  
      :hover,
      &.Mui-focusVisible {
        box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.mode === "light" ? "#888888" : "#f1f1f1", 0.15)};
      }
  
      &.Mui-active {
        box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.mode === "light" ? "#888888" : "#f1f1f1", 0.3)};
        }
      }
    }
  `
);

const StyledSlider__2 = styled(SliderUnstyled)(
  ({ theme }) => `
      color: ${theme.palette.mode === "light" ? "rgb(170, 170, 170)" : "rgb(170, 170, 170)"};
      height: 4px;
      width: 90%;
      padding: 13px 0;
      display: inline-block;
      position: relative;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      opacity: 0.75;
      &:hover {
        opacity: 1;
      }
    
      & .MuiSlider-rail {
        display: block;
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 2px;
        background-color: rgb(150, 150, 150);
        opacity: 0.38;
      }
    
      & .MuiSlider-track {
        display: block;
        position: absolute;
        height: 3px;
        border-radius: 2px;
        background-color: rgb(150, 150, 150);
      }
    
      & .MuiSlider-thumb {
        position: absolute;
        width: 6px;
        height: 3px;
        margin-left: -6px;
        margin-top: 0px;
        box-sizing: border-box;
        border-radius: 20%;
        outline: 0;
        border: none;
        background-color: none;
    
        :hover,
        &.Mui-focusVisible {
          box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.mode === "light" ? "#ffffff00" : "#ffffff00", 0)};
        }
    
        &.Mui-active {
          box-shadow: 0 0 0 0.25rem ${alpha(theme.palette.mode === "light" ? "#ffffff00" : "#ffffff00", 0)};
        }
      }
    `
);

function App() {
  const audioPlayer = useRef([createRef(), createRef(), createRef()]);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const tapeImg = process.env.REACT_APP_IMG_1;
  const tapeGif = process.env.REACT_APP_GIF_1;
  const tapeGifFast = process.env.REACT_APP_GIF_2;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrub, setScrub] = useState(false);
  const intervalRef = useRef();
  const slider = useRef();
  const [copied, setCopied] = useState("copy-p__hidden");
  const [progress, setProgress] = useState(0);

  const [playObj, setPlayObj] = useState([
    {
      id: 0,
      play: false,
      icon: playIcon,
      song: process.env.REACT_APP_AUDIO_1,
      duration: 239.967755,
      title: "Always Was Still Is Always Will Be",
    },
    {
      id: 1,
      play: false,
      icon: playIcon,
      song: process.env.REACT_APP_AUDIO_2,
      duration: 306.350363,
      title: "The Hard Part Is Coming",
    },
    {
      id: 2,
      play: false,
      icon: playIcon,
      song: process.env.REACT_APP_AUDIO_3,
      duration: 329.092948,
      title: "O a G",
    },
  ]);

  const startTimer = e => {
    const play = e.target.id;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioPlayer.current[play].current.ended) {
        console.log("end");
      } else {
        setProgress(audioPlayer.current[play].current.currentTime);
      }
    }, [200]);
  };

  const onScrub = value => {
    setScrub(true);
    const play = slider.current.id;
    // clearInterval(intervalRef.current)
    audioPlayer.current[play].current.currentTime = value;
    setProgress(audioPlayer.current[play].current.currentTime);
  };

  const playAudio = (e, x) => {
    const play = e.target.id;

    startTimer(e);

    const filterNotPlaying = playObj.filter(x => {
      return x.id != play;
    });
    const notPlaying = filterNotPlaying.map(k => {
      return k.id;
    });

    setIsPlaying(true);

    const updatedPlayObj = [...playObj];
    updatedPlayObj[play].play = true;
    updatedPlayObj[notPlaying[0]].play = false;
    updatedPlayObj[notPlaying[1]].play = false;
    setPlayObj(updatedPlayObj);

    audioPlayer.current[play].current.play();
    audioPlayer.current[notPlaying[0]].current.pause();
    audioPlayer.current[notPlaying[1]].current.pause();
  };

  const stopAudio = e => {
    const pause = e.target.id;

    clearInterval(intervalRef.current);

    setIsPlaying(false);

    const updatedPlayObj = [...playObj];
    updatedPlayObj[pause].play = false;
    setPlayObj(updatedPlayObj);

    audioPlayer.current[pause].current.pause();
  };

  useEffect(() => {
    audioPlayer.current[0].current.volume = volume;
    audioPlayer.current[1].current.volume = volume;
    audioPlayer.current[2].current.volume = volume;
  }, [volume]);

  return (
    <>
      <section className="main-container">
        <header>
          <a href="https://open.spotify.com/artist/7JpC0dmw0M65MmhL4PYEhh">
            <img className="letter1" src={v} />
          </a>
          <a href="https://www.youtube.com/watch?v=dn1GYQwSBog">
            <img className="letter2" src={o1} />
          </a>
          <a href="https://soundcloud.com/von_goose">
            <img className="letter3" src={n} />
          </a>
          <a href="https://www.youtube.com/channel/UCXxwh2DZVGyaw0OgdryEFwg">
            <img className="letter4" src={g} />
          </a>
          <a href="https://github.com/MartinAlexanderAxelsson">
            <img className="letter5" src={o2} />
          </a>
          <a href="https://scriptwave.vongoo.se">
            <img className="letter6" src={o3} />
          </a>
          <a href="https://scriptbeat.vongoo.se">
            <img className="letter7" src={s} />
          </a>
          <a href="https://von-goose.com/static">
            <img className="letter8" src={e} />
          </a>
        </header>
        <div className="toVonGoose">
          <a className="toVonGoose__a" href="https://vongoo.se">
            &#60;------Go to vongoo.se
          </a>
        </div>

        <div className="gif__container">
          <div>{isPlaying ? <img className="gif__img" src={scrub ? tapeGifFast : tapeGif} /> : <img className="gif__img" src={tapeImg} onLoad={() => setIsLoading(false)} />}</div>
          {isLoading && (
            <div className="gif-loading">
              <span className="videoLoading-animation"></span>
            </div>
          )}
        </div>

        <main>
          {playObj.map((obj, i) => {
            return (
              <div key={i} className="play__container">
                {!obj.play ? <img id={obj.id} onClick={playAudio} className="play__img" src={playIcon} /> : <img id={obj.id} onClick={stopAudio} className="play__img" src={pauseIcon} />}

                <audio muted={mute} id={obj.id} ref={audioPlayer.current[obj.id]} type="audio/wav" src={obj.song} draggable loop></audio>

                {!obj.play ? (
                  <p className="play__container__p">{obj.title}</p>
                ) : (
                  <StyledSlider ref={slider} id={obj.id} defaultValue={0} value={progress} min={0} step={1} max={obj.duration} aria-labelledby="continuous-slider" onChange={e => onScrub(e.target.value)} onMouseUp={() => setScrub(false)} onTouchEnd={() => setScrub(false)} />
                )}
              </div>
            );
          })}
          <div className="volume__slider">
            {!mute ? (
              <VolumeUpIcon
                sx={{
                  color: "rgb(165, 165, 165)",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setMute(mute ? false : true)}
              />
            ) : (
              <VolumeOffIcon
                sx={{
                  color: "rgb(165, 165, 165)",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setMute(mute ? false : true)}
              />
            )}
            <StyledSlider__2 defaultValue={0.5} value={volume} min={0} step={0.01} max={1} aria-labelledby="continuous-slider" onChange={e => setVolume(e.target.value)} />
          </div>
        </main>
        <div className="toVonGoose">
          <a className="toVonGoose__a" href="https://vongoo.se">
            &#60;------Go to vongoo.se
          </a>
        </div>
        <footer>
          <p
            onClick={() => {
              setCopied(copied == "copy-p__display" ? "copy-p__display2" : "copy-p__display");
              navigator.clipboard.writeText("von.goose@protonmail.com");
            }}
          >
            von.goose@protonmail.com
          </p>
          <p className={copied}>&nbsp;Copied!</p>
        </footer>
      </section>
    </>
  );
}

export default App;
