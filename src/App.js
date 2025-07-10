import xImg from './assets/X.png';
import oImg from './assets/O.png';
import plusImg from './assets/Plus.png';
import ghost from './assets/Invalid.png';
import xGhost from './assets/X_ghost.png';
import oGhost from './assets/O_ghost.png';
import plusGhost from './assets/Plus.png';
import Instructions from './Instructions';
import { useState, useEffect } from 'react';

function Square({ value, onSquareClick, currentPlayer, gameWiped, plusTurn }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderPiece = () => {
    if (value === 'X') {
      return <img src={xImg} alt="X" className="w-full h-full object-contain" />;
    } else if (value === 'O') {
      return <img src={oImg} alt="O" className="w-full h-full object-contain" />;
    } else if (value === '+') {
      return <img src={plusImg} alt="+" className="w-full h-full object-contain" />;
    } else {
      return null;
    }
  };

  const renderHover = () => {
    if (!gameWiped && isHovered) {
      if (value === null) {
        if (plusTurn[currentPlayer] > 0) {
          return (
            <img
              src={plusGhost}
              alt="Place +?"
              className="absolute w-full h-full object-contain opacity-70 pointer-events-none"
            />
          );
        } else {
          return (
            <img
              src={currentPlayer === 'X' ? xGhost : oGhost}
              alt="Place here?"
              className="absolute w-full h-full object-contain opacity-70 pointer-events-none"
            />
          );
        }
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
  const [plusTurn, setPlusTurn] = useState({ X: 0, O: 0 });

  const [miniWipe, setMiniWipe] = useState(false);

  const currentPlayer = xIsNext ? 'X' : 'O';
  const miniWinner = calculateMiniWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  const gameWinner = calculateWinner({ squares, xIsNext });


  function handleClick(i) {
    if (miniWipe) {
      setMiniWipe(false); // Reset flag after placing the earned "+"
    }
    if (miniWinner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();

    if (plusTurn[currentPlayer] > 0) {
      nextSquares[i] = '+';
      setPlusTurn(prev => ({ ...prev, [currentPlayer]: 0 })); // consume +
    } else {
      nextSquares[i] = currentPlayer;
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setPlusTurn({ X: 0, O: 0 });
    setMiniWipe(false);
  }

  let status;
  let statusColor;

  if (gameWinner) {
    status = `Winner: ${gameWinner}`;
    statusColor = gameWinner === 'X' ? 'text-red-600' : 'text-blue-600';
  } else {
    status = 'Next player: ' + currentPlayer;
    if (plusTurn[currentPlayer] > 0) {
      statusColor = 'text-yellow-500';
    }
    else {
      statusColor = xIsNext ? 'text-red-600' : 'text-blue-600';
    }
  }


  useEffect(() => {
    if (miniWinner && !gameWinner) {
      setPlusTurn(prev => ({
        ...prev,
        [miniWinner]: prev[miniWinner] + 1
      }));

      // Start mini wipe after a short delay to allow board display
      setTimeout(() => {
        setSquares(prevSquares =>
          prevSquares.map(val => (val === '+' ? '+' : null))
        );
        setMiniWipe(true); // will enable '+' on next turn
      }, 500); // slight delay to let player see win
    }
  }, [miniWinner, gameWinner]);

  return (
    <>
      <div className={`text-4xl font-bold mb-6 text-center ${statusColor}`}>{status}</div>

      <div className="mb-6">
        <PlayAgain onClick={resetGame} gameOver={gameWinner} />
      </div>

      <div className="flex justify-center">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
      </div>
      <div className="flex justify-center">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
      </div>
      <div className="flex justify-center">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          currentPlayer={currentPlayer}
          gameWiped={gameWinner}
          plusTurn={plusTurn}
        />
      </div>

      <div className="mt-6">
        <Instructions />
      </div>
    </>
  );
}

// Detects any 3 in a row
function calculateMiniWinner(squares) {
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

  for (let [a, b, c] of lines) {
    const line = [squares[a], squares[b], squares[c]];

    // Skip if all are empty or all '+'
    if (!line.some(val => val) || line.every(val => val === '+')) continue;

    const xCount = line.filter(val => val === 'X').length;
    const oCount = line.filter(val => val === 'O').length;
    const plusCount = line.filter(val => val === '+').length;

    // If all three are X or X and +, it's a mini win for X
    if (xCount + plusCount === 3 && oCount === 0) return 'X';

    // If all three are O or O and +, it's a mini win for O
    if (oCount + plusCount === 3 && xCount === 0) return 'O';
  }

  return null;
}

// Detects 3 '+' in a row
function calculateWinner({ squares, xIsNext }) {
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
  for (let [a, b, c] of lines) {
    if (squares[a] === '+' && squares[b] === '+' && squares[c] === '+') {
      return xIsNext ? 'O' : 'X'; // Give credit to the current player
    }
  }
  return null;
}