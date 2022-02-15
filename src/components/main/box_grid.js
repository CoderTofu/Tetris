import PlayEvent from "../tetris_bit/play_event";
import EndEvent from "../tetris_bit/end_event";
import WelcomeToTetris from "../tetris_bit/welcome";
import { useState } from 'react';

export default function BoxGrid(props) {
    let condition = props.gameCondition;
    let changeGameState = props.changeGameState

    // Passed from App to GameControl and Boxgrid(this)
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;
    
    let [score, setScore] = useState(0)

    let Display = undefined

    if (condition === "pending") {
         Display = <WelcomeToTetris />
    } else if (condition === "during") {
        Display = <PlayEvent 
                changeGameState={changeGameState}
                currentBlockState={[currentBlock, updateCurrentBlock]}
                filledState={[filledBoxes, updateFilledBoxes]}
                scoreVars={[score, setScore]}
                />
    } else if (condition === "after") {
        Display = <EndEvent 
                changeGameState={changeGameState}
                score={score}
                />
    } else {
        return (
            <div>
                There was an error :(
            </div>
        )
    }

    return (
        <>
            {Display}
        </>
    )
}

