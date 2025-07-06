import instructionsGif from './assets/Instructions.gif';
import { useState } from 'react';

export default function Instructions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-xl mx-auto mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition mx-auto block"
            >
                {isOpen ? 'Hide Instructions' : 'Show Instructions'}
            </button>

            {isOpen && (
                <div className="mt-4 bg-gray-100 border border-gray-300 p-4 rounded text-gray-800 space-y-4">
                    <p>
                        <strong>X's and O's by themselves are boring...</strong> Let's add a third symbol!
                    </p>

                    <p>
                        Whenever you <strong>connect three in a row</strong> or <strong>fill up the board</strong>, the board will automatically clear.
                    </p>

                    <p>
                        If you connect three in a row, you’ll gain a <strong>"+"</strong> symbol for your next turn! These symbols act as both an <strong>X</strong> and an <strong>O</strong>, and <strong>will NOT be wiped off the board</strong>.
                    </p>

                    <p>
                        This means you can connect combinations like <strong>X + X</strong> or <strong>O O +</strong> to wipe the board and gain another "+"!
                    </p>

                    <p>
                        Connect <strong>three "+" in a row</strong> to secure victory, regardless of who placed each "+". Be careful though—your opponent can also take advantage of the "+" symbols you place!
                    </p>

                    <div className="text-center">
                        <img
                            src={instructionsGif}
                            alt="Instructions demo"
                            className="mt-4 rounded shadow-md w-full max-w-md mx-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            This game was inspired by {' '}
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