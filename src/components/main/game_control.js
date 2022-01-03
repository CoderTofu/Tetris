export default function GameControl(props) {
    const changeGameState = props.changeFunc;

    function startFunction() {
        changeGameState(a => a = "during");
    }

    function resetFunction() {
        changeGameState(a => a = "pending")
    }

    return (
        <div>
            <button onClick={startFunction}>Start</button>
            <button onClick={resetFunction}>DevReset</button>
        </div>
    )
}