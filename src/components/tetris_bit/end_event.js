export default function EndEvent(props) {
    let score = props.score
    let changeGameState = props.changeGameState
    let [clearCurrent, clearFilled, clearScore] = props.clearGame

    const toStart = () => {
        changeGameState("during")
    }

    const toPlay = () => {
        changeGameState("pending")
        clearCurrent([])
        clearFilled([])
        clearScore(0)
    }

    return (
        <div>
            END GAME
            <div>
                You scored {score}
            </div>
            <div>
                <button onClick={toStart}>Play again!</button>
                <button onClick={toPlay}>Go to start menu.</button>
            </div>
        </div>
    )
}