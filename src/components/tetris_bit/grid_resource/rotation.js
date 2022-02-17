import { ALPHABET, GRID_HEIGHT, negativeZones } from "./GLOBAL";
import moveCollision from "./movement_collision";

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

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

    // Rotated cords if it falls in the next second
    const falling_rotated = rotated.map(block => {
        let next = ALPHABET.indexOf(block.column) + 1;
        return {
            column: ALPHABET[next],
            row: block.row
        }
    })

    // Combination of falling and not falling rotated block to check if conditions are right
    const check_rotation = arrayUnique(rotated.concat(falling_rotated))

    // Check to see if all rotated boxes are going to collide to other boxes once they spin
    const checkBoard = check_rotation.map(block => {
        return filledBoxes.includes(block)
    }).includes(true);

    // Look if rotation will cause the block to go to negative space
    const checkBorder = check_rotation.map(block => {
        return negativeZones.includes(`${block.column}${block.row}`)
    }).includes(true);

    if (!checkBorder && !checkBoard && !moveCollision(check_rotation, rowMovement, filledBoxes)) updateBlock(rotated)

    return null
}