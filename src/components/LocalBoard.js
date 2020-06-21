import * as React from "react";

import { Square } from './Square';

export class LocalBoard extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(''),
      complete: false,
      winner: ''
    }

    this.chooseSquareClassName = this.chooseSquareClassName.bind(this);
    this.chooseHighlight = this.chooseHighlight.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleClick(numSquare) {
    const squares = this.state.squares;
    const value = this.props.xIsNext ? 'X' : 'O';
    squares.splice(numSquare, 1, value);
    this.setState({squares: squares});
    const winner = this.calculateWinner();
    if (winner !=='') {
      this.setState({complete: true, winner});
      this.props.onClick(numSquare, this.props.numBoard);
    } else {
      if (!this.state.squares.includes('')) {
        const winner = 'D';
        this.setState({complete: true, winner});
      }
      this.props.onClick(numSquare);
    }
  }

  chooseSquareClassName(numSquare) {
    if (this.state.squares[numSquare]==='') {
      return this.props.xIsNext ? 'square-x' : 'square-o';
    } else {
      return this.state.squares[numSquare]==='X' ? 'square-x' : 'square-o'; 
    }
  }

  chooseHighlight() {
    if (this.props.enabled) {
      return this.props.xIsNext ? 'x-highlight' : 'o-highlight';
    }
    return '';
  }

  isDisabled(numSquare) {
    if (this.state.complete || this.state.squares[numSquare] !=='') {
      return true;
    } else {
      return !this.props.enabled;
    }
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
      if (this.state.squares[a] !== '' &&
          this.state.squares[a] === 
          this.state.squares[b] && 
          this.state.squares[a] === 
          this.state.squares[c]) {
        return this.state.squares[a];
      }
    }
    return '';
  }

  chooseWinnerClass() {
    if (this.state.winner!=='') {
      if (this.state.winner==='D'){
        return 'big-d';
      }
      return this.state.winner === 'X' ? 'big-x' : 'big-o';
    }
    return '';
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className={this.chooseWinnerClass()}>{this.state.winner}</div>
        <div className={this.chooseHighlight()} style={{padding: '0.3rem'}}>
          <div>
            <Square 
              value={this.state.squares[0]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(0)}
              className={this.chooseSquareClassName(0)}
              disabled={this.isDisabled(0)}
            />
            <Square
              value={this.state.squares[1]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(1)}
              className={this.chooseSquareClassName(1)}
              disabled={this.isDisabled(1)}
            />
            <Square
              value={this.state.squares[2]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(2)}
              className={this.chooseSquareClassName(2)}
              disabled={this.isDisabled(2)}
            />
          </div>
          <div>
            <Square
              value={this.state.squares[3]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(3)}
              className={this.chooseSquareClassName(3)}
              disabled={this.isDisabled(3)}
            />
            <Square
              value={this.state.squares[4]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(4)}
              className={this.chooseSquareClassName(4)}
              disabled={this.isDisabled(4)}
            />
            <Square 
              value={this.state.squares[5]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid black' }}
              onClick={() => this.handleClick(5)}
              className={this.chooseSquareClassName(5)}
              disabled={this.isDisabled(5)}
            />
          </div>
          <div>
            <Square
              value={this.state.squares[6]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: 'none' }}
              onClick={() => this.handleClick(6)}
              className={this.chooseSquareClassName(6)}
              disabled={this.isDisabled(6)}
            />
            <Square
              value={this.state.squares[7]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: '1px solid black', borderBottom: 'none' }}
              onClick={() => this.handleClick(7)}
              className={this.chooseSquareClassName(7)}
              disabled={this.isDisabled(7)}
            />
            <Square
              value={this.state.squares[8]}
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}
              onClick={() => this.handleClick(8)}
              className={this.chooseSquareClassName(8)}
              disabled={this.isDisabled(8)}
            />
          </div>
        </div>
      </div>
    );
  }
}