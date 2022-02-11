import "../../styles/box_grid_style.css"
import Boxes from "../tetris_bit/boxes"
import WelcomeToTetris from "../tetris_bit/welcome";
import GameScore from "./score";
import { useState } from 'react';

export default function BoxGrid(props) {
    let condition = props.gameCondition;

    // Passed from App to GameControl and Boxgrid(this)
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;
    
    let [pause, pauseUpdate] = useState(false);
    let [blockType, changeBlockType] = useState("none")
    let [score, setScore] = useState(0)

    if (condition === "pending") {
            return (
                <div>
                   <WelcomeToTetris />
                </div>
            )
        }
    if (condition === "during") {
        return (
            <div className="play-screen">

                <div className={`pause-screen ${pause ? "active" : ""}`}>
                    <h3>Paused</h3>
                </div>

                <div className="game-container">
                    <div className="">
                        <img src={`/blocks/${blockType}.png`} className="block-type" alt="" />
                    </div>

                    <div className="game-border">
                        <div className="grid-container">
                            {<Boxes
                                changeGameState={props.changeGameState}
                                filledState={[filledBoxes, updateFilledBoxes]}
                                currentBlockState={[currentBlock, updateCurrentBlock]}
                                pauseUpdate={pauseUpdate}
                                changeBlockType={changeBlockType}
                            />}
                        </div>
                    </div>
                </div>
                
                <div className="game-information">
                    <GameScore
                        score={score}
                        setScore={setScore}
                        filledState={filledBoxes}
                    />

                    <div className="game-controls">
                        <h2>Game Controls!</h2>
                        <ul>
                            <li>Escape - Pauses and unpauses the game.</li>
                            <li>Left Arrow Key - Moves the block to the left.</li>
                            <li>Right Arrow Key - Moves the block to the right.</li>
                            <li>Up Arrow Key - Rotates the block clockwise.</li>
                            <li>Shift - Hold a block.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else if (condition === "after") {
        return (
            <div>
                END GAME
                <div>
                    You scored {score}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                There was an error!
            </div>
        )
    }
}

