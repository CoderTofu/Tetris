import "../../styles/box_grid_style.css"
import Boxes from "../tetris_bit/boxesNew"
import WelcomeToTetris from "../tetris_bit/welcome";

export default function BoxGrid(props) {
    let condition = props.gameCondition;

    // Passed from App to GameControl and Boxgrid(this)
    // And from BoxGrid to Boxes
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    if (condition === "pending") {
            return (
                <div>
                   <WelcomeToTetris />
                </div>
            )
        }
    if (condition === "during") {
        return (
            <div className="grid-container">
                {<Boxes 
                    filledState={[filledBoxes, updateFilledBoxes]}
                    currentBlockState={[currentBlock, updateCurrentBlock]}
                />}
            </div>
        )
    }
}

