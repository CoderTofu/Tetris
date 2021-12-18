import BoxGrid from "./components/main/box_grid";
import GameControl from "./components/main/game_control"
import { useState } from 'react';

function App() {
  let [gameState, changeGameState] = useState("pending")
  /* gameState = [pending, during, after] */

  return (
    <div className="site-container">
      {/* // Tetris Div */}
      <BoxGrid gameCondition={gameState}/>
      {/* Tetris Control Div */}
      <GameControl changeFunc={changeGameState}/>
    </div>
  );
}

export default App;
