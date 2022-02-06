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
                    Pause
                </div>

                <div className="game-container">
                    <div className="">
                        <img src={`/blocks/${blockType}.png`} className="block-type" alt="" />
                    </div>

                    <div className="game-border">
                        <div className="grid-container">
                            {<Boxes
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
    }
}

