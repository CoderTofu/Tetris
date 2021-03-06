import { useRef, useEffect } from "react"
import "../../styles/score.css"

export default function GameScore(props) {
    let currentGrid = props.filledState;
    let prevGrid = useRef([]);
    let score = props.score;
    let setScore = props.setScore

    useEffect(() => {
        // If our current grid is less than prev grid, this would mean
        // that we have just cleared boxes.
        if (currentGrid.length < prevGrid.current.length) {
            const gridDiff = prevGrid.current.length - currentGrid.length;
            setScore(score + gridDiff)
        }
        prevGrid.current = currentGrid
    }, [score, currentGrid, setScore])

    return (
        <div className="game-score">
            <h3>Score: {score}</h3>
        </div>
    )
}