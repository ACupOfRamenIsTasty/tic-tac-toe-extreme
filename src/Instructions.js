import instructionsGif from './assets/Instructions.gif';
import { useState, useRef, useEffect } from 'react';

export default function Instructions() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Scroll into view when opened
    useEffect(() => {
        if (isOpen && containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isOpen]);

    return (
        <div ref={containerRef} className="max-w-xl mx-auto mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition mx-auto block"
            >
                {isOpen ? 'Hide Instructions' : 'How To Play'}
            </button>

            {isOpen && (
                <div className="mt-4 bg-gray-100 border border-gray-300 p-4 rounded text-gray-800 space-y-4">
                    <p>
                        <strong>X's and O's by themselves are boring...</strong> Let’s add a third symbol!
                    </p>

                    <p>
                        Whenever a player <strong>connects three in a row</strong> using any combination of their symbol and "+" (e.g. <strong>X + X</strong> or <strong>O O +</strong>), it's called a <strong>mini win</strong>.
                    </p>

                    <p>
                        A <strong>mini win</strong> rewards that player with a <strong>"+"</strong> on their next turn and triggers a <strong>mini wipe</strong>—the board clears, but all <strong>"+"</strong> symbols stay.
                    </p>

                    <p>
                        If the board fills up without anyone earning a mini win, a <strong>mini wipe</strong> occurs <strong>without a "+" awarded</strong>.
                    </p>

                    <p className="text-green-900 bg-green-100 border-l-4 border-green-500 p-2 rounded">
                        🏆 <strong>Game win:</strong><br />
                        If <strong>three "+" are connected in a row</strong>, the game ends. The player who placed the final "+" <strong>wins the game</strong>.
                    </p>

                    <p className="text-yellow-900 bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded">
                        ⚠️ <strong>Every "+" you place can be used against you!</strong><br />
                        They are wildcards and are treated as <strong>both X and O</strong>. If you're <strong>O</strong> and place a "+", your opponent <strong>X</strong> can use it to complete a line like <strong>+ X +</strong>, giving them a mini win.<br />
                    </p>

                    <div className="text-center">
                        <img
                            src={instructionsGif}
                            alt="Instructions demo"
                            className="mt-4 rounded shadow-md w-full max-w-md mx-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            This game was inspired by{' '}
                            <a
                                href="https://youtu.be/h5hMNF3kDm0"
                                className="underline hover:text-gray-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <em>Tic! Tac! Toe! ft. Tak x Corbin</em>.
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}