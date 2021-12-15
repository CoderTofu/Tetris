import "../styles/box_grid_style.css"

export default function BoxGrid(props) {
    return (
        <div className="grid-container">
            <Boxes />
        </div>
    )
}

function Boxes() {
    let blockTypes = {
        square: [
            {
                column: "A",
                row: "3"
            },
            {
                column: "A",
                row: "4"
            },
            {
                column: "D",
                row: "3"
            },
            {
                column: "B",
                row: "5"
            }
        ]
    }

    const GRID_LENGTH = 6;
    let row = [];

    // Push boxes to make a row.
    for (let i = 0; i < GRID_LENGTH; i++) {
        row.push(
            <div key={i} className="box"></div>
        )
    }

    // Stack rows on top of each other to make columns.
    const GRID_HEIGHT = 9;
    const alphabet_index = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let gridContent = [];
    for (let i = 0; i < GRID_HEIGHT; i++) {
        gridContent.push(
           <div key={alphabet_index[i]} className="box-column">
               {row.map((box, index) => {
                   const result = blockTypes.square.find(({ row, column }) => {
                       return row == index + 1 && column === alphabet_index[i]
                   });
                   if (result) {
                       return <div key={`box_fill-${index}`} className="box filled"></div>
                   } else {
                        return box
                   }
                })}
           </div>
        )
    }
    return gridContent
}
