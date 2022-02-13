export default function EndEvent(props) {
    let score = props.score

    return (
        <div>
            END GAME
            <div>
                You scored {score}
            </div>
        </div>
    )
}