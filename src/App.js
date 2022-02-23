import GameComponent from "./components/main/game_component";
import { useState } from 'react';

function App() {
  let [gameState, changeGameState] = useState("pending");
  /* gameState = [pending, during, after] */

  return (
    <div className="site-container">

      {/* // Tetris Div */}
      <GameComponent 
      gameCondition={[gameState, changeGameState]}
      />

    </div>
  );
}

export default App;
