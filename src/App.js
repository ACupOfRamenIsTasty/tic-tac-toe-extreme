import logo1 from './assets/tictactoe.png';
import logo2 from './assets/extreme.png';
import xImg from './assets/X.png';
import oImg from './assets/O.png';
import plusImg from './assets/Plus.png';
import ghost from './assets/Invalid.png';
import xGhost from './assets/X_ghost.png';
import oGhost from './assets/O_ghost.png';
import plusGhost from './assets/Plus.png';
import Instructions from './Instructions';
import { useState, useEffect } from 'react';

// Renders a single square (9 total)
function Square({ value, onSquareClick, currentPlayer, gameWiped, plusTurn }) {
  const [isHovered, setIsHovered] = useState(false);

  // Renders placed piece (X, O, or +)
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

  // Renders hover (ghost) image
  const renderHover = () => {
    if (!gameWiped && isHovered) {
      if (value === null) {
        return (
          <img
            src={plusTurn[currentPlayer] > 0 ? plusGhost : currentPlayer === 'X' ? xGhost : oGhost}
            alt="Place here?"
            className="absolute w-full h-full object-contain opacity-70 pointer-events-none"
          />
        );
      } else {
        return (
          <img
            src={ghost}
            alt="Cannot place here."
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

// Reset button
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

// Main App
export default function App() {

  const [xIsNext, setXIsNext] = useState(true); // Tracks whose turn
  const [squares, setSquares] = useState(Array(9).fill(null)); // 3x3 board array
  const [plusTurn, setPlusTurn] = useState({ X: 0, O: 0 }); // Counter for '+' tokens for each player
  const [miniWipe, setMiniWipe] = useState(false); // Whether a board wipe just occurred

  const currentPlayer = xIsNext ? 'X' : 'O';
  const miniWinner = calculateMiniWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  const gameWinner = calculateWinner({ squares, xIsNext });

  // Tracks player clicks
  function handleClick(i) {
    if (miniWipe) setMiniWipe(false); // clear wipe flag after mini wipe
    if (gameWinner || miniWinner || squares[i]) return; // prevent moves after gameWin or miniWin or on filled square

    const nextSquares = squares.slice();

    // Players forced to immediately use + tokens earned
    if (plusTurn[currentPlayer] > 0) {
      nextSquares[i] = '+';
      setPlusTurn(prev => ({ ...prev, [currentPlayer]: 0 })); // consume +
    } else {
      nextSquares[i] = currentPlayer;
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext); // switch turn
  }

  // Full reset
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setPlusTurn({ X: 0, O: 0 });
    setMiniWipe(false);
  }

  // Display game status on top
  let status;
  let statusColor;

  if (gameWinner) {
    status = `Winner: ${gameWinner}`;
    statusColor = gameWinner === 'X' ? 'text-red-600' : 'text-blue-600';
  } else {
    status = `Next player: ${currentPlayer}`;
    statusColor = plusTurn[currentPlayer] > 0 ? 'text-yellow-500' : (xIsNext ? 'text-red-600' : 'text-blue-600');
  }

  // Triggers mini wipe after 3 in a row; '+' granted
  useEffect(() => {
    if (miniWinner && !gameWinner) {
      setPlusTurn(prev => ({
        ...prev,
        [miniWinner]: prev[miniWinner] + 1
      }));

      // Start mini wipe after a short delay to allow board display
      setTimeout(() => {
        // Clear board except '+'
        setSquares(prevSquares =>
          prevSquares.map(val => (val === '+' ? '+' : null))
        );
        setMiniWipe(true); // will enable '+' on next turn
      }, 500); // slight delay to let player see win
    }
  }, [miniWinner, gameWinner]);

  // Triggers mini wipe after tie; no '+' granted
  useEffect(() => {
    if (isBoardFull && !miniWinner && !gameWinner) {
      setTimeout(() => {
        setSquares(prevSquares =>
          prevSquares.map(val => (val === '+' ? '+' : null))
        );
        setMiniWipe(true); // still allow '+' use next turn
      }, 500); // brief delay to show full board
    }
  }, [isBoardFull, miniWinner, gameWinner]);

  return (
    <>
      {/* Logo */}
      <div className="flex flex-col items-center space-y-2 mb-4">
        <img
          src={logo1}
          alt="TIC TAC TOE"
          className="w-1/2"
          style={{ padding: 0, margin: 0 }}
        />
        <img
          src={logo2}
          alt="-EX+REME-"
          className="w-[50%] object-fill"
          style={{ aspectRatio: '15/2', padding: 0, margin: 0 }}
        />

        {/* Status */}
        <div className={`text-4xl font-bold text-center ${statusColor}`}>
          {status}
        </div>
      </div>


      {/* Reset Button */}
      <div className="mb-3">
        <PlayAgain onClick={resetGame} gameOver={gameWinner} />
      </div>

      {/* Board */}
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

      {/* Instructions */}
      <div className="mt-3">
        <Instructions />
      </div>
    </>
  );
}

// Detects mini win, granting '+'
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

// Detects 3 '+' in a row, ending the game
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
      return xIsNext ? 'X' : 'O'; // Give credit to the opposite player
    }
  }
  return null;
}