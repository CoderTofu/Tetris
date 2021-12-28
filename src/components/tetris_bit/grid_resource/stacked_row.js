import { BLOCK_TYPES } from "../../block_types";
import randomBlock from "../../random/random_block";
import randomForm from "../../random/random_form";

export default function StackedRow(props) {
    // Our props
    const ROW = props.row;
    const CURRENT_BLOCK = props.block;

    const GRID_HEIGHT = 9;
    // Stack rows to make our grid.
    let stack = [];
    // Random variables we need to be random.
    let randomType = randomBlock(BLOCK_TYPES);
    let randomFormIndex = randomForm();
    // If we already have a current block then we use the current block
    let blockFill = CURRENT_BLOCK.length === 0 ? (randomType[randomFormIndex]) : (CURRENT_BLOCK);
    // Indexing
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for (let i = 0; i < GRID_HEIGHT; i++) {
        stack.push(
            <div key={ALPHABET[i]} className="box-column">
                {ROW.map((box, rowIndex) => {
                    const result = blockFill.find(({ row, column }) => {
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