import { GRID_LENGTH } from './GLOBAL';

export function checkClearRow(updateFunc, boxes, landed) {
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

    // function check(item) {
    //     return item === true
    // }

    let clearable = linesToCheck.map((line) => {
        let result = line.map((block) => {
            console.log(boxes, block)
            return boxes.includes(block)
        })
        return result
    })

    console.log(clearable);

    /**
     * First hanapin kung anong mga column ang nalandingan nung 
     * kababagsak lang na block. Then we check all columns with
     * a loop that sees if completed ng column na yun yung lahat 
     * ng rows
     */
}


function clearRow() {

}