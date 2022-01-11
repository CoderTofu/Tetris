export const ALPHABET = [
    "A", "B", "C",
    "D", "E", "F",
    "G", "H", "I",
    "J", "K", "L",
    "M", "N", "O",
    "P", "Q", "R",
    "S", "T", "U",
    "V", "W", "X",
    "Y", "Z"
];

export const GRID_HEIGHT = 20;

export const GRID_LENGTH = 10;

// Block generation is at block_types.js

export let negativeZones = mock()

function mock() {
    let negative = []
    for (let i = 0; i < ALPHABET.length; i++) {
        negative.push(`${ALPHABET[i]}0`)
        negative.push(`${ALPHABET[i]}${GRID_LENGTH + 1}`)
    }
    return negative.sort()
}

