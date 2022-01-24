import { useRef, useEffect } from "react"

export default function GameScore(props) {
    let prevGrid = useRef(props.currentBlock).current;

    /**
     * Create a variable that will be for the previous state of the grid.
     * Then create another variable for the current state of the grid.
     * Check if the length of the previous to the current decreased or increased.
     * If it decreased a score must be added. 
     * */ 

    useEffect(() => {
        console.log(prevGrid)
    }, [prevGrid])

    // scoreCheck(score, setScore)

    return (
        <div>
            Score: 0
        </div>
    )
}

export function scoreCheck() {

}