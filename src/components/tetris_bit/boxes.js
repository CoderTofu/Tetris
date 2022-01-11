import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import { useEventListener } from "./event_listener";
import randomBlock from "../random/random_block";
import { blockRotation } from "./grid_resource/rotation";

import { ALPHABET, GRID_HEIGHT, negativeZones } from "./grid_resource/GLOBAL";

export default function Boxes(props) {
    // This is our current block which is empty at first.
    let [holding, setHold] = useState(false);

    // Passed from App to GameControl and Boxgrid
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    let rowMovement = 0;
    // mock pause
    let pause = false;
    const directionHandler = ({ key }) => {
        let input = String(key);
        switch (input) {
            case "ArrowLeft":
                rowMovement = -1;
            break;
            case "ArrowRight":
                rowMovement = 1;
            break;
            case "ArrowUp":
                blockRotation(currentBlock)
            break;
            case "Escape":
                pause = !pause
                console.log(pause)
            break
            default:
                return
        }
    };  

    useEventListener("keydown", directionHandler);


    // If we are not holding a block at the moment then we send a newly generated block.
    useEffect(() => {
        if (pause) {
            console.log("stop")
            return
        }
        if (pause === false) {
            console.log("play")
        }
        const FALL_OFFSET = 1;

        // Random variables we need to be random to make new blocks.
        let randomType = randomBlock(BLOCK_TYPES);

        const shouldGameEnd = () => {
            let ans = false;

            const forbidden = ["A2", "A3", "A4", "A5"];

            const conjoined = filledBoxes.map(box => {
                return `${box.column}${box.row}`
            }).sort()

            for (let i = 0; i < forbidden.length; i++) {
                if (conjoined.includes(forbidden[i])) {
                    ans = true
                }
            }

            return ans
        }

        if (shouldGameEnd()) {
            updateFilledBoxes([])
            return
        }

        // If we don't have a block at the moment then...
        if (holding === false) {
            // Generate a new block
            console.log(randomType)
            updateCurrentBlock(randomType[0]);
            // We now have a block
            setHold(true);
        } else {
            setTimeout(() => {
                let columns = currentBlock.map(block => {
                    return block.column;
                });

                const collisionResult = () => {
                    let filledConjoined = filledBoxes.map(block => {
                        return `${block.column}${block.row}`
                    });
                    let currentConjoined = currentBlock.map(block => {
                        let next = ALPHABET.indexOf(block.column) + 1;
                        return `${block.column}${block.row}` && `${ALPHABET[next]}${block.row}`
                    });

                    if (filledConjoined.length === 0 || currentConjoined.length === 0) return false
                    for (let i = 0; i < filledConjoined.length; i++) {
                        for (let j = 0; j < currentConjoined.length; j++) {
                            if (filledConjoined[i] === currentConjoined[j]) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                const moveCollision = () => {
                    let currentConjoined = currentBlock.map(block => {
                        let next = ALPHABET.indexOf(block.column) + 1;
                        return `${block.column}${block.row}` && `${ALPHABET[next]}${block.row + rowMovement}`
                    });

                    let filledConjoined = filledBoxes.map(block => {
                        return `${block.column}${block.row}`
                    });

                    let filled = negativeZones.concat(filledConjoined).sort()

                    if (currentConjoined.length === 0) return false
                    for (let i = 0; i < currentConjoined.length; i++) {
                        if (filled.includes(currentConjoined[i])) return true
                    }    
                    
                    return false;
                }

                if (columns.includes(ALPHABET[GRID_HEIGHT - FALL_OFFSET]) || collisionResult()) {
                    // Now, we don't have a block
                    if (pause) {
                        console.log("stop")
                        return
                    }
                    setHold(false)
                    updateFilledBoxes([
                        ...filledBoxes,
                        ...currentBlock
                    ]);
                } else {
                    if (collisionResult()) return
                    if (pause) {
                        console.log("stop")
                        return
                    }
                    updateCurrentBlock(currentBlock.map(block => {
                        let nextColumn = ALPHABET.indexOf(block.column) + 1;
                        let nextRow = block.row + rowMovement;
                        if (moveCollision()) nextRow = block.row
                        return {
                            column: ALPHABET[nextColumn],
                            row: nextRow
                        }
                    }));
                }
            }, 250)
        }
    }, [filledBoxes, holding, updateCurrentBlock, updateFilledBoxes, currentBlock, rowMovement, pause])

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()}/>
        </>
    )
}