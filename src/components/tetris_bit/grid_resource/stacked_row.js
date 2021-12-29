function StackedRow(props) {
    // Our props
    const ROW = props.row;
    const CURRENT_BLOCK = props.block;
    // console.log(CURRENT_BLOCK)

    // Stack rows to make our grid.
    const GRID_HEIGHT = 9;
    let stack = [];

    // Indexing
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for (let i = 0; i < GRID_HEIGHT; i++) {
        stack.push(
            <div key={ALPHABET[i]} className="box-column">
                {ROW.map((box, rowIndex) => {
                    const result = CURRENT_BLOCK.find(({ row, column }) => {
                        return row === rowIndex + 1 && column === ALPHABET[i]
                    });
                    if (result) {
                        return <div key={`box_fill-${rowIndex}`} className="box filled"></div>
                    } else {
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