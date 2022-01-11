function Row() {
    const GRID_LENGTH = 10;

    let row = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }
    return row
}

export default Row