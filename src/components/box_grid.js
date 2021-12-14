import "../styles/box_grid_style.css"
import { useState } from "react";

export default function BoxGrid() {
    let boxes = Boxes();
    let blockTypes = {
        square: [
            {
                column: "A",
                row: "3"
            },
            {
                column: "A",
                row: "4"
            },
            {
                column: "B",
                row: "3"
            },
            {
                column: "B",
                row: "4"
            }
        ]
    }
    return (
        <div className="grid-container">
            {boxes.map((column) => {
                return column
            })}
        </div>
    )
}

function Boxes() {
    const GRID_LENGTH = 6;
    let row = [];
    let [boxState, changeBoxState] = useState("box")
    // Push boxes to make a row.
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className={boxState}></div>
        )
    }
    // Stack rows on top of each other to make columns.
    const GRID_HEIGHT = 9;
    const alphabet_index = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    let gridContent = [];
    for (let i = 0; i < GRID_HEIGHT; i++) {
        gridContent.push(
           <div key={alphabet_index[i]} className="box-column">
               {row.map(box => {return box})}
           </div>
        )
    }
    return gridContent
}
