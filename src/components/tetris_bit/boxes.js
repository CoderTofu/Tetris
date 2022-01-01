import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";

export default function Boxes() {
    // This is our current block which is empty at first.
    let [hold, setHold] = useState(false);
    let [filledBoxes, updateFilledBoxes] = useState([]);
    let [currentBlock, updateCurrentBlock] = useState([]);

    // If we are not holding a block at the moment then we send a newly generated block.
    useEffect(() => {
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

        const GRID_MAX_HEIGHT = 9;
        const FALL_OFFSET = 1;

        if (!hold) {
            // Random variables we need to be random.
            let randomType = randomBlock(BLOCK_TYPES);
            let randomFormIndex = randomForm();
            updateCurrentBlock(randomType[randomFormIndex])
            // Set hold to true
            setHold(!hold)
        } else if (hold) {
            setTimeout(() => {
                let columns = currentBlock.map(block => {
                    return block.column
                })

                let collisionResult;
                let collision = currentBlock.map(block => {
                    let next = ALPHABET.indexOf(block.column) + 1;
                    let result = filledBoxes.find(({ row, column }) => {
                        return row === block.row + 1 && column === ALPHABET[next]
                    });
                    if (result) {
                        collisionResult = true;
                        return result
                    }
                })

                if (columns.includes(ALPHABET[GRID_MAX_HEIGHT - FALL_OFFSET]) || collisionResult) {
                    // Set hold to false
                    setHold(!hold)
                    updateFilledBoxes([
                        ...filledBoxes,
                        ...currentBlock
                    ])
                    collisionResult = false
                } else {
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
    }, [hold, currentBlock, filledBoxes])

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()}/>
        </>
    )
}