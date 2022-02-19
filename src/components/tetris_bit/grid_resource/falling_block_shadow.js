import { ALPHABET, GRID_HEIGHT, FALL_OFFSET } from "./GLOBAL";
import moveCollision from "./movement_collision";
import { fallCollision } from './fall_collision';

export default function fallingBlockShadow(updateShadowBlock, shadowBlock, rowMovement, filledBoxes) {
    let columns = shadowBlock.map(block => {
        return block.column;
    });

    while (columns.includes(ALPHABET[GRID_HEIGHT - FALL_OFFSET]) ||
            fallCollision(shadowBlock, filledBoxes)) {
        updateShadowBlock(shadowBlock.map(block => {
            let nextColumn = ALPHABET.indexOf(block.column) + 1;
            let nextRow = block.row + rowMovement;
            if (moveCollision(shadowBlock, rowMovement, filledBoxes)) nextRow = block.row
            return {
                column: ALPHABET[nextColumn],
                row: nextRow
            }
        }));
    }

    // updateShadowBlock(shadowBlock.map(block => {
    //     let nextColumn = ALPHABET.indexOf(block.column) + 1;
    //     let nextRow = block.row + rowMovement;
    //     if (moveCollision(shadowBlock, rowMovement, filledBoxes)) nextRow = block.row
    //     return {
    //         column: ALPHABET[nextColumn],
    //         row: nextRow
    //     }
    // }));
}

// Filled boxes
// - To check for collision with the shadow

// Current block
// - Help measure where the block will eventually fall.

// HOW?
// block columns is supposed to be block rows
// First get the full length of the grid so we have a full limit.
// Then make a while loop
// while all conditions are still right, make the shadow drop if not then stap