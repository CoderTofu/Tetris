import Row from "./grid_resource/row";
import { useEffect, useRef, useState } from 'react';

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
    // Block Holding
    const holding = useRef(false);
    // Tetris Animation
    const requestRef = useRef();

    // Shift Hold Variables
    const randomType = useRef();
    const shiftHold = useRef([]);
    // Variable to help figure out if the user has already use shift hold
    const held = useRef(false);

    const refFilledBoxes = useRef();
    const refCurrentBlock = useRef();
    const refRowMovement = useRef(0);
    let [filledBoxes, updateFilledBoxes] = props.filledState;
    let [currentBlock, updateCurrentBlock] = props.currentBlockState;

    // Pause Handler
    const pause = useRef(false)
    // Pause Screen Updater
    let pauseScreenUpdater = props.pauseUpdate; 
    // Shift to hold visuals
    let shiftHoldBlock = props.changeBlockType
    let [blockHoldVisual, changeBlockVisual] = useState() 
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
                if (pause.current) return
                blockRotation(updateCurrentBlock, currentBlock, filledBoxes, refRowMovement.current);
                break;
            case "Escape":
                pause.current = !pause.current
                pauseScreenUpdater(pause.current)
                break
            case "Shift":
                if (held.current || pause.current) return
                let block_place_holder = randomType.current;
                // If the user is yet to shift hold
                // We just generate a new block and take the current block type.
                if (shiftHold.current.length === 0) {
                    generateBlock();
                    shiftHoldBlock(`${blockHoldVisual}`)
                    shiftHold.current = block_place_holder;
                    held.current = true;
                } 
                // Once the player started to use shift hold
                // We generate a new block while passing the block that they shift holded
                // So that it can be generated again
                else {
                    generateBlock(shiftHold.current);
                    shiftHoldBlock(`${blockHoldVisual}`)
                    shiftHold.current = block_place_holder;
                    held.current = true;
                }
                break
            default:
                return
        }
    };
    
    const dropCounter = useRef(0); 
    const previousTimeRef = useRef(0);
    const dropInterval = 250;

    const generateBlock = (type = "") => {
        // Random variable we need to be random to make new blocks.
        let [generatedBlock, generatedType] = randomBlock(BLOCK_TYPES);
        changeBlockVisual(generatedType)
        // For shift to hold feature
        if (type === "") {
            randomType.current = generatedBlock;
        } else {
            randomType.current = type
        }
        // Generate a new block
        refCurrentBlock.current = randomType.current[0];
        // We now have a block
        holding.current = true;
    }

    const update = (time = 0) => {
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;
        dropCounter.current+= deltaTime;

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
            if (shouldGameEnd()) {
                console.log("--Game ends here!---")
                return
            }   
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
                held.current = false;
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