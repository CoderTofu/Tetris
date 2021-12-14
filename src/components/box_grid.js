export default function BoxGrid() {
    let rows = BoxRows();
    return (
        <>
            {rows.map((box) => {
                return box
            })}
        </>
    );
}

function Box() {
    return (
        <div className="box">
            just a box
        </div>
    )
}

function BoxRows() {
    let length = 6;
    let rowArray = [];
    for (let i = 1; i < length; i++) {
        rowArray.push(Box())
    }
    return rowArray
}