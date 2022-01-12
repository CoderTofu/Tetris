import { ALPHABET } from "./GLOBAL";
import moveCollision from "./movement_collision";

export default function updateBlock(updateCurrentBlock, currentBlock, rowMovement, filledBoxes) {
    updateCurrentBlock(currentBlock.map(block => {
        let nextColumn = ALPHABET.indexOf(block.column) + 1;
        let nextRow = block.row + rowMovement;
        console.log(nextRow)
        if (moveCollision(currentBlock, rowMovement, filledBoxes)) nextRow = block.row
        return {
            column: ALPHABET[nextColumn],
            row: nextRow
        }
    }));
}