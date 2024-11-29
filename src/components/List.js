import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useBoardContext } from '../context/BoardContext';
import Card from './Card';
import CardModal from './CardModal';

const List = ({ list, index }) => {
  const { addCard, deleteList } = useBoardContext();
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle);
      setNewCardTitle('');
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-gray-100 rounded-lg p-4 m-2 w-72 flex-shrink-0"
        >
          <div 
            {...provided.dragHandleProps} 
            className="flex justify-between items-center mb-4"
          >
            <h2 className="text-lg font-semibold">{list.title}</h2>
            <button 
              onClick={() => deleteList(list.id)} 
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <Droppable droppableId={list.id} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 min-h-[100px]"
              >
                {list.cards.map((card, cardIndex) => (
                  <div key={card.id} onClick={() => handleCardClick(card)}>
                    <Card card={card} listId={list.id} index={cardIndex} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <form onSubmit={handleAddCard} className="mt-4">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Add a new card"
              className="w-full border rounded px-2 py-1"
            />
            {newCardTitle.trim() && (
              <button 
                type="submit" 
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                Add Card
              </button>
            )}
          </form>

          {selectedCard && (
            <CardModal 
              card={selectedCard} 
              listId={list.id} 
              onClose={handleCloseModal} 
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default List;