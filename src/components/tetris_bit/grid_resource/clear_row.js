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

    let clearable = linesToCheck.map((lines) => {
        return lines.map((cords) => {
            let result = filledBoxes.find(({column, row}) => {
                return column === cords.column && row === cords.row
            })
            if (result) return true
            else return false
        }).every((val) => {
            return val === true
        })
    })

    console.log(clearable.find(true))

    /**
     * First hanapin kung anong mga column ang nalandingan nung 
     * kababagsak lang na block. Then we check all columns with
     * a loop that sees if completed ng column na yun yung lahat 
     * ng rows
     */
}


// function clearRow() {

// }