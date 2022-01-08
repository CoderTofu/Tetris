import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import { useEventListener } from "./event_listener";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";

export default function Boxes(props) {
    // This is our current block which is empty at first.
    let [holding, setHold] = useState(false);

    // Passed from App to GameControl and Boxgrid
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    let rowMovement = 0;
    let blockIndex = 0;
    const directionHandler = ({ key }) => {
        let input = String(key);
        switch (input) {
            case "ArrowLeft":
                rowMovement = -1;
            break;
            case "ArrowRight":
                rowMovement = 1;
            break;
            // case "ArrowUp":
            //     blockIndex = 1;
            // break;
            default: 
                return
        }
    };  

    useEventListener("keydown", directionHandler);

    // If we are not holding a block at the moment then we send a newly generated block.
    useEffect(() => {
        const GRID_MAX_HEIGHT = 9;
        const FALL_OFFSET = 1;
        const ALPHABET = [
            "A", "B", "C",
            "D", "E", "F",
            "G", "H", "I",
            "J", "K", "L",
            "M", "N", "O",
            "P", "Q", "R",
            "S", "T", "U",
            "V", "W", "X",
            "Y", "Z"
        ];

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
            updateCurrentBlock(randomType[blockIndex]);
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

                    let negativeZones = [
                        "A0", "B0", "C0", "D0", "E0", "F0", "G0", "H0", "I0",
                        "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"
                    ]

                    let filled = negativeZones.concat(filledConjoined).sort()

                    if (currentConjoined.length === 0) return false
                    for (let i = 0; i < currentConjoined.length; i++) {
                        if (filled.includes(currentConjoined[i])) return true
                    }    
                    
                    return false;
                }

                if (columns.includes(ALPHABET[GRID_MAX_HEIGHT - FALL_OFFSET]) || collisionResult()) {
                    // Now, we don't have a block
                    setHold(false)
                    updateFilledBoxes([
                        ...filledBoxes,
                        ...currentBlock
                    ]);
                } else {
                    if (collisionResult()) return
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
            }, 500)
        }
    }, [filledBoxes, holding, updateCurrentBlock, updateFilledBoxes, currentBlock, rowMovement])

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()}/>
        </>
    )
}