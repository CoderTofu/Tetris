import { BLOCK_TYPES } from "../block_types";
import randomBlock from "../random/random_block";
import randomForm from "../random/random_form";
import { useState } from 'react';

export default function Boxes() {
    let [currentBlock, updateCurrentBlock] = useState([])

    const GRID_LENGTH = 6;
    let row = [];

    // Push boxes to make a row.
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }

    // Stack rows on top of each other to make columns.
    const GRID_HEIGHT = 9;
    const alphabet_index = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let randomType = randomBlock(BLOCK_TYPES);
    let gridContent = [];
    let randomFormIndex = randomForm();


    // If we don't have a current block
    if (currentBlock.length < 4) {
        for (let i = 0; i < GRID_HEIGHT; i++) {
            gridContent.push(
                <div key={alphabet_index[i]} className="box-column">
                    {row.map((box, index) => {
                        const result = randomType[randomFormIndex].find(({ row, column }) => {
                            return row === index + 1 && column === alphabet_index[i]
                        });
                        if (result) {
                            updateCurrentBlock([...currentBlock, result])
                            return <div key={`box_fill-${index}`} className="box filled"></div>
                        } else {
                            return box
                        }
                    })}
                </div>
            )
        }
    }
    // If we currently have a block
    else {
        for (let i = 0; i < GRID_HEIGHT; i++) {
            gridContent.push(
                <div key={alphabet_index[i]} className="box-column">
                    {row.map((box, index) => {
                        const result = currentBlock.find(({ row, column }) => {
                            return row === index + 1 && column === alphabet_index[i]
                        });
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

    console.log(currentBlock)
    return gridContent
}
