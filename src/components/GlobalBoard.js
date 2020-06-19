import * as React from "react";

import { LocalBoard } from './LocalBoard';

export class GlobalBoard extends React.Component<
  {}, 
  {
    activeBoards: boolean[],
    completedBoards: boolean[],
    boardWinners: string[],
    xIsNext: boolean,
    winner: string,
    buttonDisabled: boolean
  }
>
{
  constructor(props: any) {
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

  handleClick(numSquare: number, boardCompleted?: number) {
    if (boardCompleted || boardCompleted===0) {
      const completedBoards = this.state.completedBoards;
      completedBoards.splice(boardCompleted, 1, true);
      const boardWinners = this.state.boardWinners;
      const thisWinner = this.state.xIsNext ? 'X' : 'O';
      boardWinners.splice(boardCompleted, 1, thisWinner);
      this.setState({completedBoards, boardWinners});
      const winner = this.calculateWinner();
      if (winner!=='') {
        this.setState({winner});
        const activeBoards = this.state.activeBoards;
        activeBoards.fill(false);
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
          <p className={this.state.winner==='X' ? 'default-text-x' : 'default-text-o'} style={{display: this.state.winner==='' ? 'none' : 'inline'}}>
            {this.state.winner}
          </p>
          <p className='default-text' style={{display: this.state.winner==='' ? 'none' : 'inline'}}>
            is the winner!
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