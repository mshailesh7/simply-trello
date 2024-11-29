import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useBoardContext } from '../context/BoardContext';

const Card = ({ card, listId, index }) => {
  const { deleteCard } = useBoardContext();

  const handleDelete = (event) => {
    // Prevent the default behavior and stop event propagation
    event.stopPropagation();
    deleteCard(listId, card.id);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border rounded p-2 flex justify-between items-center"
        >
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{card.title}</h3>
            {card.description && <p className="text-xs text-gray-600">{card.description}</p>}
            {card.dueDate && <p className="text-xs text-gray-600">Due: {card.dueDate}</p>}
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
