import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useBoardContext } from '../context/BoardContext';
import List from './List';
import Header from './Header';

const Board = () => {
  const { lists, addList, onDragEnd, resetBoard } = useBoardContext();
  const [newListTitle, setNewListTitle] = useState('');

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      addList(newListTitle);
      setNewListTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <Header resetBoard={resetBoard} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable 
          droppableId="board-lists" 
          direction="horizontal" 
          type="LIST"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex overflow-x-auto p-4 flex-grow"
            >
              {/* Render lists */}
              {lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))}

              {/* Placeholder for drag-and-drop */}
              {provided.placeholder}

              {/* Form for adding a new list */}
              <div className="bg-gray-200 rounded-lg p-4 m-2 w-72 flex-shrink-0">
                <form onSubmit={handleAddList}>
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="Enter list title"
                    className="w-full border rounded px-2 py-1 mb-2"
                  />
                  {newListTitle.trim() && (
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Add List
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
