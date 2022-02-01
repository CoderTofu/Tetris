import { useRef, useEffect, useState } from "react"
import "../../styles/score.css"

export default function GameScore(props) {
    let currentGrid = props.filledState;
    let prevGrid = useRef([]);
    let [score, setScore] = useState(0)

    useEffect(() => {
        // If our current grid is less than prev grid, this would mean
        // that we have just cleared boxes.
        if (currentGrid.length < prevGrid.current.length) {
            const gridDiff = prevGrid.current.length - currentGrid.length;
            setScore(score + gridDiff)
        }
        prevGrid.current = currentGrid
    }, [score, currentGrid])

    return (
        <div className="game-score">
            Score: {score}
        </div>
    )
}