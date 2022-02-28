import GameControl from "./game_starter";
import PlayEvent from "../tetris_bit/play_event";
import EndEvent from "../tetris_bit/end_event";
import WelcomeToTetris from "../tetris_bit/welcome";
import { useState } from 'react';

export default function GameComponent(props) {
    let [condition, changeGameState] = props.gameCondition;

    // Passed from App to GameControl and Boxgrid(this)
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = useState([]);
    let [currentBlock, updateCurrentBlock] = useState([]);
    
    let [score, setScore] = useState(0)

    if (condition === "pending") {
        return (
            <>
                <WelcomeToTetris />
                <GameControl changeFunc={changeGameState}/>
            </>
        )
    } else if (condition === "during") {
        return (
            <PlayEvent 
                changeGameState={changeGameState}
                currentBlockState={[currentBlock, updateCurrentBlock]}
                filledState={[filledBoxes, updateFilledBoxes]}
                scoreVars={[score, setScore]}
            />
        )
    } else if (condition === "after") {
        return (
            <EndEvent
                changeGameState={changeGameState}
                score={score}
            />
        )
    } else {
        return (
            <div>
                There was an error :(
            </div>
        )
    }
}

