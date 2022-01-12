import { ALPHABET, negativeZones } from "./GLOBAL";

export default function moveCollision(currentBlock, rowMovement, filledBoxes) {
    let currentConjoined = currentBlock.map(block => {
        let next = ALPHABET.indexOf(block.column) + 1;
        return `${block.column}${block.row}` && `${ALPHABET[next]}${block.row + rowMovement}`
    });

    let filledConjoined = filledBoxes.map(block => {
        return `${block.column}${block.row}`
    });

    let filled = negativeZones.concat(filledConjoined).sort()

    if (currentConjoined.length === 0) return false
    for (let i = 0; i < currentConjoined.length; i++) {
        if (filled.includes(currentConjoined[i])) return true
    }

    return false;
}