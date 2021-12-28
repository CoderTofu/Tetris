import Row from "./grid_resource/row";
import StackedRow from "./grid_resource/stacked_row";
import { useState } from 'react';

export default function Boxes() {
    // This is our current block which is empty at first.
    let [hold, setHold] = useState(false)
    let [currentBlock, updateCurrentBlock] = useState([]);

    const animateFall = () => {
        requestAnimationFrame(animateFall)
    }

    return (
        <StackedRow block={currentBlock} setBlock={updateCurrentBlock} row={Row()}/>
    )
}



/** DECEMBER 22, 2021
 * Look for a way to accurately fill the boxes.
 * In a way that is also able to pass in the boxes that were filled.
 */