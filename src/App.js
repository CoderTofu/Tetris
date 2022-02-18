import GameComponent from "./components/main/game_component";
import GameControl from "./components/main/game_starter"
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
      <GameComponent 
      gameCondition={gameState}
      changeGameState={changeGameState}
      filledState={[filledBoxes, updateFilledBoxes]}
      currentBlockState={[currentBlock, updateCurrentBlock]}
      />

    </div>
  );
}

export default App;
