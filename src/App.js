import xImg from './assets/X.png';
import oImg from './assets/O.png';
import plusImg from './assets/Plus.png';
import ghost from './assets/Invalid.png';
import xGhost from './assets/X_ghost.png';
import oGhost from './assets/O_ghost.png';
import plusGhost from './assets/Plus.png';
import Instructions from './Instructions';
import { useState } from 'react';

function Square({ value, onSquareClick, currentPlayer, gameOver }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderPiece = () => {
    if (value === 'X') {
      return <img src={xImg} alt="X" className="w-full h-full object-contain" />;
    } else if (value === 'O') {
      return <img src={oImg} alt="O" className="w-full h-full object-contain" />;
    } else {
      return null;
    }
  };

  const renderHover = () => {
    if (!gameOver && isHovered) {
      if (value === null) {
        return (
          <img
            src={currentPlayer === 'X' ? xGhost : oGhost}
            alt="Ghost"
            className="absolute w-full h-full object-contain opacity-70 pointer-events-none"
          />
        );
      } else {
        return (
          <img
            src={ghost}
            alt="Invalid move"
            className="absolute w-full h-full object-contain opacity-50 pointer-events-none"
          />
        );
      }
    }
    return null;
  };

  return (
    <button
      onClick={onSquareClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-24 h-24 sm:w-28 sm:h-28 border border-gray-500 relative flex items-center justify-center transition"
    >
      {/* Piece always visible if placed */}
      {renderPiece()}
      {/* Hover overlay only on hover */}
      {renderHover()}
    </button>
  );
}

function PlayAgain({ onClick, gameOver }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition mx-auto block"
    >
      {gameOver ? "Play again?" : "Start Over"}
    </button>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  let statusColor;
  if (winner) {
    status = 'Winner: ' + winner;
    statusColor = winner === 'X' ? 'text-red-600' : 'text-blue-600';
  } else if (!winner && isBoardFull) {
    status = "It's a tie!";
    statusColor = 'text-gray-600';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusColor = xIsNext ? 'text-red-600' : 'text-blue-600';
  }

  return (
    <>
      <div className={`text-4xl font-bold mb-6 text-center ${statusColor}`}>{status}</div>

      <div className="mb-6">
        <PlayAgain onClick={resetGame} gameOver={winner || isBoardFull} />
      </div>

      <div className="flex justify-center">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
      </div>
      <div className="flex justify-center">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
      </div>
      <div className="flex justify-center">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameOver={winner || isBoardFull}
        />
      </div>

      <div className="mt-6">
        <Instructions />
      </div>
    </>
  );
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}