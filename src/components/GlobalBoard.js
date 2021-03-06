import * as React from "react";

import { LocalBoard } from './LocalBoard';

export class GlobalBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBoards: new Array(9).fill(false),
      completedBoards: new Array(9).fill(false),
      boardWinners: new Array(9).fill(''),
      xIsNext: true,
      winner: '',
      buttonDisabled: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    const activeBoards = this.state.activeBoards;
    activeBoards.fill(true);
    this.setState({activeBoards, buttonDisabled: true});
  }

  handleClick(numSquare, boardCompleted='', boardWinner='') {
    if (boardCompleted || boardCompleted===0) {
      const completedBoards = this.state.completedBoards;
      completedBoards.splice(boardCompleted, 1, true);
      const boardWinners = this.state.boardWinners;
      boardWinners.splice(boardCompleted, 1, boardWinner);
      this.setState({completedBoards, boardWinners});
      const winner = this.calculateWinner();
      if (winner!=='') {
        const activeBoards = this.state.activeBoards;
        activeBoards.fill(false);
        this.setState({winner, activeBoards});
        return;
      }
      if (!this.state.completedBoards.includes(false)){
        const winner = 'D';
        const activeBoards = this.state.activeBoards;
        activeBoards.fill(false);
        this.setState({winner, activeBoards});
        return;
      }
    }

    const activeBoards = this.state.activeBoards;
    if (this.state.completedBoards[numSquare]) {
      activeBoards.fill(true);
      for (let i = 0; i < 9; i++) {
        if (this.state.completedBoards[i]) {
          activeBoards[i] = false;
        }
      }
    } else {
      activeBoards.fill(false);
      activeBoards.splice(numSquare, 1, true);
    }
    this.setState({activeBoards, xIsNext: !this.state.xIsNext});
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.state.boardWinners[a] !== '' &&
          this.state.boardWinners[a] === 
          this.state.boardWinners[b] && 
          this.state.boardWinners[a] === 
          this.state.boardWinners[c]) {
        return this.state.boardWinners[a];
      }
    }
    return '';
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button
            className='start-button'
            onClick={this.startGame}
            disabled={this.state.buttonDisabled}
          >
            Start Game
          </button>
          <p className={this.state.xIsNext ? 'default-text-x' : 'default-text-o'} style={{display: this.state.buttonDisabled && this.state.winner==='' ? 'inline' : 'none'}}>
            {this.state.xIsNext ? 'X' : 'O'}
          </p>
          <p className='default-text' style={{display: this.state.buttonDisabled && this.state.winner==='' ? 'inline' : 'none'}}>
            Is Next
          </p>
          <p className={this.state.winner==='X' ? 'default-text-x' : 'default-text-o'} style={{display: this.state.winner==='' || this.state.winner==='D' ? 'none' : 'inline'}}>
            {this.state.winner}
          </p>
          <p className='default-text' style={{display: this.state.winner==='' || this.state.winner==='D' ? 'none' : 'inline'}}>
            is the winner!
          </p>
          <p className='default-text' style={{display: this.state.winner==='D' ? 'inline' : 'none'}}>
            It's a draw!
          </p>
        </div>
        <div style={{display: 'flex',  justifyContent: 'center'}}>
          {<LocalBoard numBoard={0} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[0]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={1} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[1]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={2} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[2]}/>}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className='global-board-horizontal-line'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {<LocalBoard numBoard={3} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[3]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={4} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[4]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={5} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[5]}/>}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className='global-board-horizontal-line'/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {<LocalBoard numBoard={6} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[6]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={7} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[7]}/>}
          <div className='global-board-vertical-line'/>
          {<LocalBoard numBoard={8} xIsNext={this.state.xIsNext} onClick={this.handleClick} enabled={this.state.activeBoards[8]}/>}
        </div>
      </div>
    );
  }
}