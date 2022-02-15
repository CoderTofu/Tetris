export default function EndEvent(props) {
    let score = props.score;

    const toStart = () => {
        window.location.reload(false);
    }

    return (
        <div>
            END GAME
            <div>
                You scored {score}
            </div>
            <div>
                <button onClick={toStart}>Restart</button>
            </div>
        </div>
    )
}