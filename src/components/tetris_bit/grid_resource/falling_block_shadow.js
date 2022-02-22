import { ALPHABET, GRID_HEIGHT, FALL_OFFSET } from "./GLOBAL";
import moveCollision from "./movement_collision";
import { fallCollision } from './fall_collision';

export default function fallingBlockShadow(updateShadowBlock, shadowBlock, rowMovement, filledBoxes) {
    function fallingRecursion(BLOCK, movement) {
        let columns = BLOCK.map(block => {
            return block.column;
        });

        if (columns.includes(ALPHABET[GRID_HEIGHT - FALL_OFFSET]) ||fallCollision(BLOCK, filledBoxes)) {
            updateShadowBlock(BLOCK)
            return
        } else {
            // Go down 1 block then do it again
            let fall_once = BLOCK.map(block => {
                let nextColumn = ALPHABET.indexOf(block.column) + 1;
                let nextRow = block.row + movement;
                if (moveCollision(BLOCK, rowMovement, filledBoxes)) nextRow = block.row
                return {
                    column: ALPHABET[nextColumn],
                    row: nextRow
                }
            });
            // This way every time the player moves the block would only move to a direction once
            movement = 0;
            fallingRecursion(fall_once, movement)
        }
    }

    fallingRecursion(shadowBlock, rowMovement)
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