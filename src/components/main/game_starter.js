export default function GameControl(props) {
    const changeGameState = props.changeFunc;

    // let updateFilledBoxes = props.filledState;
    // let updateCurrentBlock = props.currentBlockState;

    function startFunction() {
        changeGameState(a => a = "during");
    }

    return (
        <div>
            <button onClick={startFunction} className="btn">Start</button>
        </div>
    )
}