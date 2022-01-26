import BoxGrid from "./components/main/box_grid";
import GameControl from "./components/main/game_control"
import { useState } from 'react';

function App() {
  let [gameState, changeGameState] = useState("pending");
  /* gameState = [pending, during, after] */

  // We did this so that game controls will be able to clean up previous states to prevent errors.

  // Passed from App(this) to GameControl and Boxgrid
  // And from BoxGrid to Boxes
  let [filledBoxes, updateFilledBoxes] = useState([]);
  let [currentBlock, updateCurrentBlock] = useState([]);

  return (
    <div className="site-container">

      {/* // Tetris Div */}
      <BoxGrid 
      gameCondition={gameState}
      filledState={[filledBoxes, updateFilledBoxes]}
      currentBlockState={[currentBlock, updateCurrentBlock]}
      />

      {/* Tetris Control Div */}
      {gameState === "pending" ? 
      <GameControl
        changeFunc={changeGameState}
        filledState={updateFilledBoxes}
        currentBlockState={updateCurrentBlock}
      />: ""}

    </div>
  );
}

export default App;
