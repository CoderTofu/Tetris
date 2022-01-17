import { ALPHABET, GRID_HEIGHT, negativeZones } from "./GLOBAL";
import moveCollision from "./movement_collision";

export function blockRotation(updateBlock, blocks, filledBoxes, rowMovement) {
    let coords = blocks.map(block => {
        let columnLetterIndex = ALPHABET.indexOf(block.column);
        let columnNumberIndex = GRID_HEIGHT - columnLetterIndex;
        return {
            column: columnNumberIndex,
            row: block.row
        }
    });

    let origin = coords[coords.length - 2];

    const compute1 = coords.map(block => {
        let computeVarOne = block.column - origin.column;
        let computeVarTwo = block.row - origin.row;
        return {
            column: computeVarOne,
            row: computeVarTwo
        }
    });

    // This is clockwise
    const compute2 = compute1.map(computed => {
        const newX = (0 * computed.row) + (1 * computed.column);
        const newY = (-1 * computed.row) + (0 * computed.column);
        return {
            column: newY + origin.column,
            row: newX + origin.row
        }
    })

    const rotated = compute2.map(compute => {
        const numToLetterIndex = 20 - compute.column;
        return {
            column: ALPHABET[numToLetterIndex],
            row: compute.row
        }
    })

    // Look at all boxes if they're going to collide once they spin
    const checkBoard = rotated.map(block => {
        return filledBoxes.includes(block)
    }).includes(true);

    // Look if rotation will cause the block to go to negative space
    const checkBoarder = rotated.map(block => {
        return negativeZones.includes(`${block.column}${block.row}`)
    }).includes(true);

    if (!checkBoard || !checkBoarder || moveCollision(rotated, rowMovement, filledBoxes)) updateBlock(rotated);

    return null
}