import { ALPHABET } from "./GLOBAL";

export const fallCollision = (currentBlock, filledBoxes) => {
    let filledConjoined = filledBoxes.map(block => {
        return `${block.column}${block.row}`
    });
    let currentConjoined = currentBlock.map(block => {
        let next = ALPHABET.indexOf(block.column) + 1;
        return `${block.column}${block.row}` && `${ALPHABET[next]}${block.row}`
    });

    if (filledConjoined.length === 0 || currentConjoined.length === 0) return false
    for (let i = 0; i < filledConjoined.length; i++) {
        for (let j = 0; j < currentConjoined.length; j++) {
            if (filledConjoined[i] === currentConjoined[j]) {
                return true;
            }
        }
    }
    return false;
}