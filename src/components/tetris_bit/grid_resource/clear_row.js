import { GRID_LENGTH } from './GLOBAL';

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
        let test = linesThatPassed.map((cords) => {
            let result = filledBoxes.find(({ column, row }, index) => {
                if (column === cords.column && row === cords.row){
                    return index
                }
                return null
            })
            return result
        })
        console.log(test)
        // remove
    }
}


// function clearRow() {

// }