import { ALPHABET, GRID_HEIGHT } from "./GLOBAL";

function StackedRow(props) {
    // Props
    const ROW = props.row;
    const CURRENT_BLOCK = props.block;
    const CURRENT_GRID = props.grid;

    // Stack rows to make our grid.
    let stack = [];

    for (let i = 0; i < GRID_HEIGHT; i++) {
        stack.push(
            <div key={ALPHABET[i]} className="box-column">
                {ROW.map((box, rowIndex) => {
                    const current_block_result = CURRENT_BLOCK.find(({ row, column }) => {
                        return row === rowIndex + 1 && column === ALPHABET[i]
                    });
                    const current_grid_result = CURRENT_GRID.find(({ row, column }) => {
                        return row === rowIndex + 1 && column === ALPHABET[i]
                    });
                    if (current_block_result) {
                        return <div key={`box_fill-${rowIndex}`} className="box current"></div>
                    } if (current_grid_result) {
                        return <div key={`box_fill-${rowIndex}`} className="box filled"></div>
                    }
                    else {
                        return box
                    }
                })}
            </div>
        )
    }

    return (
        <>
            {stack.map((column) => {
                return column
            })}
        </>
    )
}

export default StackedRow