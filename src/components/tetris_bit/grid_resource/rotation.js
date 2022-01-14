import { ALPHABET, GRID_HEIGHT } from "./GLOBAL";

export function blockRotation(updateBlock, blocks) {
    let coords = blocks.map(block => {
        let columnLetterIndex = ALPHABET.indexOf(block.column);
        let columnNumberIndex = GRID_HEIGHT - columnLetterIndex;
        return {
            column: columnNumberIndex,
            row: block.row
        }
    });

    let origin = coords[coords.length - 2];

    console.log(blocks)
    console.log(coords)

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
        const numToLetterIndex = compute.column - 20;
        return {
            column: ALPHABET[numToLetterIndex],
            row: compute.row
        }
    })

    updateBlock(rotated)

    return null
    // block.column is in alphabet
    // with the top being "A" and the bottom being ALPHABET[GRID_HEIGHT - OFFSET]
    // now I have to not only change block column to numerical form
    // I also have to start with "1" being the very bottom and the top being GRID_HEIGHT - 1
    // my grid should then be 1 - 10 from left to right
    // and 1 - 20 from bottom to top
}