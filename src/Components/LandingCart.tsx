import Button from "./Button";

type Props = {
    handleClick: () => void;
}

const LandingCart: React.FC<Props> = (props) => {


    return(
        <div className="landing">
            <div className="description">The Pomodoro Technique is a time-management method that uses short work intervals and breaks to enhance productivity, focus, and reduce stress.</div>
            <Button className="start-button" key="start-button" text="Start" onClick={props.handleClick} />          
        </div>
    );
}

export default LandingCart;