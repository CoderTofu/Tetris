import "../../styles/play_event.css"
import Boxes from "./boxes";
import GameScore from "../main/score";
import { useState } from 'react';

export default function PlayEvent(props) {

    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    let [pause, pauseUpdate] = useState(false);
    let [blockType, changeBlockType] = useState("none")
    let [score, setScore] = props.scoreVars

    return (
        <div className="play-screen">

            <div className={`pause-screen ${pause ? "active" : ""}`}>
                <h3>Paused</h3>
            </div>

            <div className="game-container">
                <div className="hold-container">
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
                        <li>Ctrl or Z key - Rotates the block counter clockwise.</li>
                        <li>Shift - Hold a block.</li>
                        <li>Alt - Quit play session.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}