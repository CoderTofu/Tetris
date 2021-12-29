function Row() {
    const GRID_LENGTH = 6;

    let row = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }
    return row
}

export default Row