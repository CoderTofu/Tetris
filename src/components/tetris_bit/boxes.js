import Row from "./grid_resource/row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import { useEventListener } from "./event_listener";
import randomBlock from "../random/random_block";

import { ALPHABET, GRID_HEIGHT, FALL_OFFSET, GRID_LENGTH } from "./grid_resource/GLOBAL";
import StackedRow from "./grid_resource/stacked_row";
import { blockRotation } from "./grid_resource/rotation";
import updateBlock from "./grid_resource/update_block";
import { fallCollision } from './grid_resource/fall_collision';

export default function Boxes(props) {
    // This is our current block which is empty at first.
    let [holding, setHold] = useState(false);

    // Passed from App to GameControl and Boxgrid
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    let rowMovement = 0;

    // Pause Handler
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
                blockRotation(updateCurrentBlock, currentBlock)
            break;
            case "Escape":
                pause = !pause
                if (pause === false) updateBlock(updateCurrentBlock, currentBlock, rowMovement, filledBoxes)
            break
            default:
                return
        }
    };  

    useEventListener("keydown", directionHandler);

    // If we are not holding a block at the moment then we send a newly generated block.
    useEffect(() => {
        if (pause) return
        // Random variables we need to be random to make new blocks.
        let randomType = randomBlock(BLOCK_TYPES);

        const shouldGameEnd = () => {
            let ans = false;

            const top = [];

            for(let i = 0; i < GRID_LENGTH; i++) {
                top.push(`${ALPHABET[0]}${i}`)
            }

            const conjoined = filledBoxes.map(box => {
                return `${box.column}${box.row}`
            }).sort()

            for (let i = 0; i < top.length; i++) {
                if (conjoined.includes(top[i])) {
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
            updateCurrentBlock(randomType[0]);
            // We now have a block
            setHold(true);
        } else {
            setTimeout(() => {
                let columns = currentBlock.map(block => {
                    return block.column;
                });

                if (columns.includes(ALPHABET[GRID_HEIGHT - FALL_OFFSET]) || fallCollision(currentBlock, filledBoxes)) {
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
                    if (fallCollision(currentBlock, filledBoxes)) return
                    if (pause) return
                    updateBlock(updateCurrentBlock, currentBlock, rowMovement, filledBoxes)
                }
            }, 250)
        }
    }, [currentBlock, filledBoxes, holding, pause, rowMovement, updateCurrentBlock, updateFilledBoxes])

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()}/>
        </>
    )
}