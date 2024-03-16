import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

// If any of these props change, the Board will re-render
function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] != null || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "🎀";
    } else {
      nextSquares[i] = "🍞";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "🎀" : "🍞");
  }

  // In the Board component, each Square component is rendered with the onSquareClick prop
  // The prop gets called when a square is clicked
  // 1. handleClick
  // 2. Then go to Square to add the bow or bread to the square button
  return (
  <>
    <div className="status">{status}</div>
    <div className = "board-row"> 
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className = "board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className = "board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  );
}

// Everytime you reload the page, the entire React application is re-initialized
// App gets rendered. As part of rendering App, the Board component is rendered too since its
// returned by the App.
export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // History[0] = {null, null,}

  function handlePlay(nextSquares) {
    const nextHistory = ([...history.slice(0, currentMove+1), nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
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

  for (let i=0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    // if a value exists in a, and that value exists in b & c then we have a 3 in a row.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      return squares[a]; // returns which letter won
    }
  }
  return null;
}