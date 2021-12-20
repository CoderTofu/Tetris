import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";
import { useState } from 'react';

export default function Boxes() {
    // This is our current block which is empty at first.
    let [hold, setHold] = useState(false)
    let [currentBlock, updateCurrentBlock] = useState([]);

    const GRID_LENGTH = 6;
    const GRID_HEIGHT = 9;

    // Create rows
    let row = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }

    // Stack rows to make our grid.
    let content = [];

    // Random variables we need to be random.
    let randomType = randomBlock(BLOCK_TYPES);
    let randomFormIndex = randomForm();

    // Indexing
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    // If we are not currently holding a block
    if (!hold) {
        for (let i = 0; i < GRID_HEIGHT; i++) {
            content.push(
                <div key={ALPHABET[i]} className="box-column">
                    {row.map((box, index) => {
                        const result = randomType[randomFormIndex].find(({ row, column }) => {
                            return row === index + 1 && column === ALPHABET[i]
                        });
                        console.log(result)
                        if (result) {
                            return <div key={`box_fill-${index}`} className="box filled"></div>
                        } else {
                            return box
                        }
                    })}
                </div>
            )
        }
    } 
    
    else if (hold) {

    }

    return content
}