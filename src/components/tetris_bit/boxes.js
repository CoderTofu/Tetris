import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState, useEffect } from 'react';

import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";

export default function Boxes() {
    // This is our current block which is empty at first.
    let [hold, setHold] = useState(false);
    let [currentBlock, updateCurrentBlock] = useState([]);

    // If we are not holding a block at the moment then we send a newly generated block.
    useEffect(() => {
        // Indexing
        const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        if (!hold) {
            // Random variables we need to be random.
            let randomType = randomBlock(BLOCK_TYPES);
            let randomFormIndex = randomForm();
            updateCurrentBlock(randomType[randomFormIndex])
            setHold(!hold)
        } else {
            setTimeout(() => {
                updateCurrentBlock(currentBlock.map(block => {
                    let next = ALPHABET.indexOf(block.column) + 1; 
                    return {
                        column: ALPHABET[next],
                        row: block.row
                    }
                }));
            }, 1000)
        }
    }, [hold, currentBlock])

    return (
        <>
            <StackedRow block={currentBlock} row={Row()}/>
        </>
    )
}



/** DECEMBER 22, 2021
 * Look for a way to accurately fill the boxes.
 * In a way that is also able to pass in the boxes that were filled.
 */