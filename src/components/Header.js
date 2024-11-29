import React from 'react';
import { useBoardContext } from '../context/BoardContext';

const Header = () => {
  const { resetBoard } = useBoardContext();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Simply Trello - By Shailesh Mishra</h1>
      </div>
      <button 
        onClick={resetBoard} 
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Reset Board
      </button>
    </header>
  );
};

export default Header;