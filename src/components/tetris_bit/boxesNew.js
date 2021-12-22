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

    console.log(row)
    return row
}

function StackedRow(props) {
    const GRID_HEIGHT = 9;

    // Stack rows to make our grid.
    let content = [];

    // Random variables we need to be random.
    let randomType = randomBlock(BLOCK_TYPES);
    let randomFormIndex = randomForm();

    // Indexing
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    let Late = props.row
    console.log(Late)

    return (
        <>
            {Late.map((item) => {
                return item
            })}
        </>
    )
}