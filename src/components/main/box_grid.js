import "../../styles/box_grid_style.css"
import Boxes from "../tetris_bit/boxes"
import WelcomeToTetris from "../tetris_bit/welcome";

export default function BoxGrid(props) {
    let condition = props.gameCondition;

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

