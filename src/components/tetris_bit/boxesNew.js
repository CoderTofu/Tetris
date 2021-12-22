import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";
import { useState } from 'react';

export default function Boxes() {
    // This is our current block which is empty at first.
    let [hold, setHold] = useState(false)
    let [currentBlock, updateCurrentBlock] = useState([]);

    return (
        <StackedRow row={Row()}/>
    )
}

function Row() {
    const GRID_LENGTH = 6;

    let row = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }
    return row
}

function StackedRow(props) {
    const GRID_HEIGHT = 9;
    // Stack rows to make our grid.
    let stack = [];
    // Random variables we need to be random.
    let randomType = randomBlock(BLOCK_TYPES);
    let randomFormIndex = randomForm();
    // Indexing
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for (let i = 0; i < GRID_HEIGHT; i++) {
        stack.push(
            <div key={ALPHABET[i]} className="box-column">
                {props.row.map((box, rowIndex) => {
                    const result = randomType[randomFormIndex].find(({ row, column }) => {
                        return row === rowIndex + 1 && column === ALPHABET[i]
                    });
                    if (result) {
                        /**
                         * 
                         * Add a timeout for every 0.25 seconds that will tell the program to 
                         * update the current block. Do this by first storing the current blocks
                         * in an array. Then modify the current block position in some kind of
                         * function coordinates modifier.
                         * 
                         * requestAnimationFrame maybe able to help so try looking that up
                         * 
                         * */ 
                        return <div key={`box_fill-${rowIndex}`} className="box filled"></div>
                    } else {
                        return box
                    }
                })}
            </div>
        )
    }

    return (
        <>
            {stack.map((column) => {
                return column
            })}
        </>
    )
}

/** DECEMBER 22, 2021
 * Look for a way to accurately fill the boxes.
 * In a way that is also able to pass in the boxes that were filled.
 */