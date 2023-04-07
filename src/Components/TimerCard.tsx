import Timer from "./Timer";
import Button from "../Components/Button";
import { MyObject } from "../App";

type Props = {
    isPaused: boolean;
    timesArray: MyObject[];
    handlePause: () => void;
    handleCancel: () => void;
    externalSetTime: boolean;
    externalTimeSet: () => void;
    handleBreakTime: () => void;
    isBreak: boolean;
}

const TimerCard: React.FC<Props> = (props) => {

    return(
    <div className={!props.isBreak ? "time-card" : "time-card-break"}>
        <Timer isPaused={props.isPaused} inputTimes={props.timesArray} externalSetTime={props.externalSetTime} externalTimeSet={props.externalTimeSet} handleBreakTime={props.handleBreakTime}/>
        <div className="control">
          {props.isPaused ? (
            <Button className="button" text="Resume" onClick={props.handlePause} />
          ) : (
            <Button className="button" text="Pause" onClick={props.handlePause} />
          )}
          <Button className="button" text="Cancel" onClick={props.handleCancel} />            
        </div>
    </div>
    )
}

export default TimerCard;