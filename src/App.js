import react, { useState, useRef, createRef } from "react"
import logo from "./logo.svg"
import "./App.css"
import play from "./images/play1.png"
import pause from "./images/pause.png"
import AWSIAWB from "./audio/1.mp3"
import THPIC from "./audio/2.mp3"

function App() {
  const audioPlayer = useRef([createRef(), createRef(), createRef()])

  const [isPlaying, setIsPlaying] = useState(false)
  const [playObj, setPlayObj] = useState([
    {
      play: false,
      song: AWSIAWB,
    },
    {
      play: false,
      song: THPIC,
    },
    {
      play: false,
      song: THPIC,
    },
  ])
  const [copied, setCopied] = useState("copy-p__hidden")

  const handleAudio = (e) => {
    const i = e.target.id

    playObj[i].play = true
    setIsPlaying(isPlaying === false ? true : false)

    if (isPlaying) {
      audioPlayer.current[i].current.play()
    } else {
      audioPlayer.current[i].current.pause()
    }
  }

  return (
    <>
      <header></header>
      <main>
        {playObj.map((obj, i) => {
          return (
            <div key={i} className="play__container">
              {!obj.play ? (
                <img
                  id={i}
                  onClick={handleAudio}
                  className="play__img"
                  src={play}
                />
              ) : (
                <img
                  id={i}
                  onClick={handleAudio}
                  className="play__img"
                  src={pause}
                />
              )}
              <audio
                ref={audioPlayer.current[i]}
                type="audio/wav"
                src={obj.song}
              ></audio>
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
