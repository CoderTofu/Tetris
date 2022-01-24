import Row from "./grid_resource/row";
import { useEffect, useRef } from 'react';

import { BLOCK_TYPES } from "../block_types";
import { useEventListener } from "./event_listener";
import randomBlock from "../random/random_block";

import { ALPHABET, GRID_HEIGHT, FALL_OFFSET, GRID_LENGTH } from "./grid_resource/GLOBAL";
import StackedRow from "./grid_resource/stacked_row";
import { blockRotation } from "./grid_resource/rotation";
import updateFall from "./grid_resource/update_fall";
import { fallCollision } from './grid_resource/fall_collision';
import { checkClearRow } from "./grid_resource/clear_row";

export default function Boxes(props) {
    const holding = useRef(false);
    const requestRef = useRef()

    const refFilledBoxes = useRef();
    const refCurrentBlock = useRef();
    const refRowMovement = useRef(0)
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    // Pause Handler
    const pause = useRef(false)
    const directionHandler = ({ key }) => {
        let input = String(key);
        switch (input) {
            case "ArrowLeft":
                refRowMovement.current = -1;
                break;
            case "ArrowRight":
                refRowMovement.current = 1;
                break;
            case "ArrowUp":
                blockRotation(updateCurrentBlock, currentBlock, filledBoxes, refRowMovement.current);
                break;
            case "Escape":
                pause.current = !pause.current
                break
            default:
                return
        }
    };
    
    const dropCounter = useRef(0); 
    const previousTimeRef = useRef(0);
    const dropInterval = 250;

    const update = (time = 0) => {
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;
        dropCounter.current+= deltaTime;

        const generateBlock = () => {
            // Random variable we need to be random to make new blocks.
            let randomType = randomBlock(BLOCK_TYPES);
            // Generate a new block
            refCurrentBlock.current = randomType[0];
            // We now have a block
            holding.current = true;
        }

        const shouldGameEnd = () => {
            let ans = false;

            const top = [];

            for (let i = 0; i < GRID_LENGTH; i++) {
                top.push(`${ALPHABET[0]}${i}`)
            }

            const conjoined = refFilledBoxes.current.map(box => {
                return `${box.column}${box.row}`
            }).sort()

            for (let i = 0; i < top.length; i++) {
                if (conjoined.includes(top[i])) {
                    ans = true
                }
            }

            return ans
        }

        if (dropCounter.current > dropInterval && !pause.current) {
            if (shouldGameEnd()) return        
            if (holding.current === false) generateBlock();

            let columns = refCurrentBlock.current.map(block => {
                return block.column;
            });

            if (columns.includes(ALPHABET[GRID_HEIGHT - FALL_OFFSET]) || fallCollision(refCurrentBlock.current, refFilledBoxes.current)) {
                // Now, we don't have a block
                holding.current = false;
                refFilledBoxes.current = [
                    ...refFilledBoxes.current,
                    ...refCurrentBlock.current
                ]
                updateFilledBoxes([
                    ...refFilledBoxes.current,
                ]);
                checkClearRow(updateFilledBoxes, refFilledBoxes.current, refCurrentBlock.current)
            } else {
                updateFall(updateCurrentBlock, refCurrentBlock.current, refRowMovement.current, filledBoxes)
                refRowMovement.current = 0;
            }

            dropCounter.current = 0;
        }

        requestRef.current = requestAnimationFrame(update);
    }


    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    })

    useEffect(() => {
        refCurrentBlock.current = currentBlock
        refFilledBoxes.current = filledBoxes
    }, [currentBlock, filledBoxes])

    useEventListener("keydown", directionHandler);

    return (
        <>
            <StackedRow block={currentBlock} grid={filledBoxes} row={Row()} />
        </>
    )
}