import React from 'react';
import { BoardProvider } from './context/BoardContext';
import Board from './components/Board';

const App = () => {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
};

export default App;
