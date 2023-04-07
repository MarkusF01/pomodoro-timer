import React, { useEffect, useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";
import TimerCard from "./Components/TimerCard";
import LandingCart from "./Components/LandingCart";

export interface MyObject {
  time: number;
  isFocus: boolean;
}

function App() {
  const [isStarted, setStarted] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isBreak, setBreak] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [springsTimer, apiTimer] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));


  let x = 1500;
  let y = 300;
  let z = 900;
  const [externalSetTime, setExternalSetTime] = useState(false);
  const timesArray: MyObject[] = [
    { time: x, isFocus: true },
    { time: y, isFocus: false },
    { time: z, isFocus: false },
    { time: x, isFocus: true }, //hacky approach
  ];

  useEffect(() => {
    api.start({
      from: {
        x: -5000,
      },
      to: {
        x: 0
      },
    })

    apiTimer.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
    })
  }, [ isStarted])

  const handleClick = () => {
    setStarted(!isStarted);
    setPaused(false);
    setBreak(false);
  };

  const handlePause = () => {
    setPaused(!isPaused);
  };

  const handleSetTime = () => {
    setExternalSetTime((prevSetTime) => !prevSetTime);
  }

  const handleExternalSetTime = () => {
    setExternalSetTime(false);
  }

  const handleBreakTime = () => {
    setBreak((prevBreak) => !prevBreak);
  }

  return (
    <div className="App">
      <div className="header">Pomodoro Timer</div>
      {isStarted ? (
        <animated.div style={{ ...springsTimer }}>
          <TimerCard isPaused={isPaused} timesArray={timesArray} handlePause={handlePause} handleCancel={handleClick} externalSetTime={externalSetTime} externalTimeSet={handleExternalSetTime} handleBreakTime={handleBreakTime} isBreak={isBreak} />
        </animated.div>
      ) : (
        <animated.div style={{ ...springs }}>
          <LandingCart handleClick={handleClick} />
        </animated.div>
      )}

      <div className="footer">

        <div>© 2023 Copyright - Markus Fehringer </div>
        {isStarted ? <button className="set-time" onClick={handleSetTime}>Set time to 5 seconds</button> : null}
      </div>
    </div>
  );
}

export default App;
