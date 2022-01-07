import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";

export default function Boxes(props) {
    // This is our current block which is empty at first.
    let [holding, setHold] = useState(false);

    // Passed from App to GameControl and Boxgrid
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

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
            // Random variables we need to be random.
            let randomType = randomBlock(BLOCK_TYPES);
            let randomFormIndex = randomForm();
            // Generate a new block
            updateCurrentBlock(randomType[randomFormIndex]);
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
                        let next = ALPHABET.indexOf(block.column) + 1;
                        return {
                            column: ALPHABET[next],
                            row: block.row
                        }
                    })); 
                }
            }, 500)
        }
    }, [filledBoxes, holding, updateCurrentBlock, updateFilledBoxes, currentBlock])

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()}/>
        </>
    )
}