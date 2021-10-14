import react, { useState, useRef, createRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import playIcon from "./images/play1.png";
import pauseIcon from "./images/pause.png";
import AWSIAWB from "./audio/1.mp3";
import THPIC from "./audio/2.mp3";
import OAG from "./audio/3.mp3";

function App() {
  const audioPlayer = useRef([createRef(), createRef(), createRef()]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playObj, setPlayObj] = useState([
    {
      id: 0,
      play: false,
      icon: playIcon,
      song: AWSIAWB,
    },
    {
      id: 1,
      play: false,
      icon: playIcon,
      song: THPIC,
    },
    {
      id: 2,
      play: false,
      icon: playIcon,
      song: OAG,
    },
  ]);
  const [copied, setCopied] = useState("copy-p__hidden");

  const playAudio = e => {
    const play = e.target.id;
    const filterNotPlaying = playObj.filter((x, index, arr) => {
      return x.id != play;
    });
    const notPlaying = filterNotPlaying.map((k, v) => {
      return k.id;
    });

    const updatedPlayObj = [...playObj];
    updatedPlayObj[play].play = true;
    updatedPlayObj[notPlaying[0]].play = false;
    updatedPlayObj[notPlaying[1]].play = false;
    setPlayObj(updatedPlayObj);

    audioPlayer.current[play].current.play();
    audioPlayer.current[notPlaying[0]].current.pause();
    audioPlayer.current[notPlaying[1]].current.pause();
    console.log(playObj);
  };

  const stopAudio = e => {
    const pause = e.target.id;

    const updatedPlayObj = [...playObj];
    updatedPlayObj[pause].play = false;

    setPlayObj(updatedPlayObj);
    audioPlayer.current[pause].current.pause();
  };
  // useEffect(() => {
  //   console.log(playObj);
  // }, [playObj]);
  return (
    <>
      <header></header>
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
              </div>
            );
          })}
      </main>
      <footer>
        <p
          onClick={() => {
            setCopied(
              copied == "copy-p__display"
                ? "copy-p__display2"
                : "copy-p__display"
            );
            navigator.clipboard.writeText("von.goose@protonmail.com");
          }}
        >
          von.goose@protonmail.com
        </p>
        <p className={copied}>&nbsp;Copied!</p>
      </footer>
    </>
  );
}

export default App;
