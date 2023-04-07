import React, { useState, useEffect } from "react";
import { MyObject } from "../App";
import "./Timer.css";


interface Props {
  inputTimes: MyObject[];
  isPaused: boolean;
  externalSetTime: boolean;
  externalTimeSet: () => void;
  handleBreakTime: () => void;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const Timer: React.FC<Props> = ({ inputTimes, isPaused, externalSetTime, externalTimeSet, handleBreakTime }) => {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(inputTimes[step].time);
  const [rounds, setRounds] = useState(1);
  const ringTone = new Audio("./alarm.mp3");


  const handleRounds = () => {
    setRounds((prevRound) => prevRound + 1);
    if (rounds >= 4) {
      setRounds(1);
    } else {
      setStep(0);
    }
  };

  if(externalSetTime){
    setTime(6);
    externalTimeSet();
  }

  useEffect(() => {
    if (step === 1 && rounds >= 4) {
      setStep(2);
    } else if (step === 2) {
      handleRounds();
    }

    if (step === inputTimes.length - 1) {
      setStep(0);
    } else {
      setTime(inputTimes[step].time);
    }
  }, [step]);

  useEffect(() => {
    if (!isPaused && time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (time === 0) {
      ringTone.play();
      handleBreakTime();
      setStep((prevStep) => prevStep + 1);
    }
  }, [isPaused, time]);

  return (
    <div className="timer">
      <div>{inputTimes[step].isFocus ? "Focus-Time" : "Break"}</div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
