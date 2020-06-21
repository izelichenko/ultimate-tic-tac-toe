import React from 'react';
import './css/ultimate.css';

import { GlobalBoard } from './components/GlobalBoard';
function App() {
  return (
    <div style={{display: '-webkit-box', verticalAlign: 'center'}}>
      <div className='rules-box'>
      Rules:
        <p className='rules-item'>
          X goes first
        </p>
        <p className='rules-item'>
          X may go anywhere
        </p>
        <p className='rules-item'>
          The position last chosen within a local board indicates where on the global board the next player must go
        </p>
        <p className='rules-item'>
          A local board is complete when three X's or three O's are placed in a row
        </p>
        <p className='rules-item'>
          Once a local board is complete, it is out of play. If a player gets directed there, they can then go on any incomplete local board
        </p>
        <p className='rules-item'>
          The player who wins three local boards aligned in a row wins the game!
        </p>
      </div>
      <GlobalBoard />
    </div>
  );
}

export default App;
