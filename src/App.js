import react, { useState, useRef, createRef, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import gif from "./images/tape.gif"
import gifStill from "./images/tapeStill.png"
import playIcon from "./images/play1.png"
import pauseIcon from "./images/pause.png"
import AWSIAWB from "./audio/1.mp3"
import THPIC from "./audio/2.mp3"
import OAG from "./audio/3.mp3"
import SliderUnstyled from "@mui/core/SliderUnstyled"
import { styled, alpha, Box } from "@mui/system"

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
      width: 5px;
      height: 3px;
      margin-left: -6px;
      margin-top: 0px;
      box-sizing: border-box;
      border-radius: 0%;
      outline: 0;
      border: none;
      background-color: #1a1a1a;
  
      :hover,
      &.Mui-focusVisible {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
          0.15
        )};
      }
  
      &.Mui-active {
        box-shadow: 0 0 0 0.25rem ${alpha(
          theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
          0.3
        )};
      }
    }
  `
)

function App() {
  const audioPlayer = useRef([createRef(), createRef(), createRef()])

  const [isPlaying, setIsPlaying] = useState(false)
  const [playObj, setPlayObj] = useState([
    {
      id: 0,
      play: false,
      icon: playIcon,
      song: AWSIAWB,
      duration: 300,
      title: "Always Was Still Is Always Will Be",
    },
    {
      id: 1,
      play: false,
      icon: playIcon,
      song: THPIC,
      duration: 300,
      title: "The Hard Part Is Coming",
    },
    {
      id: 2,
      play: false,
      icon: playIcon,
      song: OAG,
      duration: 300,
      title: "O a G",
    },
  ])
  const [copied, setCopied] = useState("copy-p__hidden")

  const playAudio = (e) => {
    const play = e.target.id
    const filterNotPlaying = playObj.filter((x, index, arr) => {
      return x.id != play
    })
    const notPlaying = filterNotPlaying.map((k, v) => {
      return k.id
    })
    setIsPlaying(true)
    const updatedPlayObj = [...playObj]
    updatedPlayObj[play].play = true
    updatedPlayObj[notPlaying[0]].play = false
    updatedPlayObj[notPlaying[1]].play = false
    setPlayObj(updatedPlayObj)

    audioPlayer.current[play].current.play()
    audioPlayer.current[notPlaying[0]].current.pause()
    audioPlayer.current[notPlaying[1]].current.pause()
  }

  const stopAudio = (e) => {
    const pause = e.target.id
    setIsPlaying(false)
    const updatedPlayObj = [...playObj]
    updatedPlayObj[pause].play = false

    setPlayObj(updatedPlayObj)
    audioPlayer.current[pause].current.pause()
  }

  // useEffect(() => {
  //   console.log(playObj);
  // }, [playObj]);

  //favicon cassettetape

  return (
    <>
      <header></header>
      <div className="gif__container">
        {isPlaying ? (
          <img className="gif__img" src={gif} />
        ) : (
          <img className="gif__img" src={gifStill} />
        )}
      </div>

      <main>
        {playObj &&
          playObj.map((obj, i) => {
            return (
              <div key={i} className="play__container">
                {!obj.play ? (
                  <img
                    id={obj.id}
                    onClick={playAudio}
                    className="play__img"
                    src={playIcon}
                  />
                ) : (
                  <img
                    id={obj.id}
                    onClick={stopAudio}
                    className="play__img"
                    src={pauseIcon}
                  />
                )}
                <audio
                  id={obj.id}
                  ref={audioPlayer.current[obj.id]}
                  type="audio/wav"
                  src={obj.song}
                ></audio>
                {!obj.play ? (
                  <p className="play__container__p">{obj.title}</p>
                ) : (
                  <StyledSlider defaultValue={0} />
                )}
              </div>
            )
          })}
      </main>

      <footer>
        <p
          onClick={() => {
            setCopied(
              copied == "copy-p__display"
                ? "copy-p__display2"
                : "copy-p__display"
            )
            navigator.clipboard.writeText("von.goose@protonmail.com")
          }}
        >
          von.goose@protonmail.com
        </p>
        <p className={copied}>&nbsp;Copied!</p>
      </footer>
    </>
  )
}

export default App
