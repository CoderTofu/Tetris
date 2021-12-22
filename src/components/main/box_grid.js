import "../../styles/box_grid_style.css"
import Boxes from "../tetris_bit/boxes"
import WelcomeToTetris from "../tetris_bit/welcome";

export default function BoxGrid(props) {
    let condition = props.gameCondition;

    /* 
     * Every time currentBlock is called we call a function that makes it update.
     * This way it will update like it is moving.
     * Problem is we don't know how to reload the <Boxes/>
     */

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
                {<Boxes />}
            </div>
        )
    }
    // if (condition === "after") {
    //     return (
    //         <div className="grid-container">
    //             <Boxes />
    //         </div>
    //     )
    // }
}

