export default function GameControl(props) {
    const changeGameState = props.changeFunc;

    // let updateFilledBoxes = props.filledState;
    // let updateCurrentBlock = props.currentBlockState;

    function startFunction() {
        changeGameState(a => a = "during");
    }

    // function resetFunction() {
    //     changeGameState(a => a = "pending");
    //     updateFilledBoxes([]);
    //     updateCurrentBlock([]);
    // }

    return (
        <div>
            <button onClick={startFunction}>Start</button>
            {/* <button onClick={resetFunction}>DevReset</button> */}
        </div>
    )
}