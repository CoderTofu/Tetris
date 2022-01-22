/* eslint-disable no-unused-vars */
import { ALPHABET, GRID_LENGTH } from './GLOBAL';

export function checkClearRow(updateFunc, filledBoxes, landed) {
    let columnsOfLanded = landed.map(block => {
        return block.column
    })

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    let allUniqueColumns = columnsOfLanded.filter(onlyUnique);

    let linesToCheck = allUniqueColumns.map((col) => {
        let line = []
        for (let i = 0; i < GRID_LENGTH; i++) {
            line.push({
                column: col,
                row: i + 1
            })
        }
        return line
    })

    let linesThatPassed = []
    linesToCheck.map((lines) => {
        let line = lines.map((cords) => {
            let result = filledBoxes.find(({column, row}) => {
                return column === cords.column && row === cords.row
            })
            if (result) return true
            else return false
        }).every((val) => {
            return val === true
        })
        if (line) linesThatPassed.push(...lines)
        return line
    })

    if (linesThatPassed.length > 0) {
        let filtered = filledBoxes.filter((a) => {
            return !linesThatPassed.map((b) => {
                return `${b.column}${b.row}`
            }).includes(`${a.column}${a.row}`)
        })

        let affected = linesThatPassed.map((block) => block.column).filter(onlyUnique);
        let affectedIndex = affected.map(column => {
            return ALPHABET[ALPHABET.indexOf(column)]
        })

        // function indexFilter(item) {
        //     return i
        // }

        /**
         * Gawa ka function na iseseperate yung mga na apektuhan nung filter
         * Basically lahat ng may columns na less than yung index nila sa column na na filter
         * If index of "T" is 19 then lahat ng mababa sakanya ay madadagdagan yung index sa column
         */

        let adjust = filtered.map((block) => {
            let columnIndex = ALPHABET.indexOf(block.column);
            let result = affectedIndex.filter((a) => {
                return columnIndex < a
            })
            // If not less than the index of affected then block should not fall
            if (!result) return block
            let adjustColumn = ALPHABET[ALPHABET.indexOf(block.column) + affected.length];
            return {
                column: adjustColumn,
                row: block.row
            }
        })

        // let adjust = affectedIndex.map(columnIndex => {
        // })

        console.log(affected)

        updateFunc(adjust)

        // remove
    }
}


// function clearRow(updateFunc, filledBoxes, index) {
//     console.log(index)
// }