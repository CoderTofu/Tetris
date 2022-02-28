import "../../styles/end_event.css"

export default function EndEvent(props) {
    let score = props.score;

    const toStart = () => {
        window.location.reload(false);
    }

    return (
        <div className="end-screen-display">
            <div className="congratulations">
                <h2>Congratulations!</h2>
                <h3>You scored {score} points.</h3>
            </div>
            <button onClick={toStart} className="btn">Restart</button>
        </div>
    )
}