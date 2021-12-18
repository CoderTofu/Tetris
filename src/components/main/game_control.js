export default function GameControl(props) {
    const changeGameState = props.changeFunc;

    function startFunction() {
        changeGameState(a => a = "during");
    }

    return (
        <>
            <button onClick={startFunction}>Start</button>
        </>
    )
}