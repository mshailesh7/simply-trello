import React, { createContext, useState, useContext, useEffect } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const savedBoard = localStorage.getItem('trello-board');
    if (savedBoard) {
      try {
        const parsedBoard = JSON.parse(savedBoard);
        setLists(parsedBoard);
      } catch (error) {
        console.error('Failed to parse localStorage data:', error);
        setLists([]);
      }
    }
  }, []);
  
  useEffect(() => {
    if (lists.length) {
      localStorage.setItem('trello-board', JSON.stringify(lists));
    }
  }, [lists]);

  const addList = (title) => {
    setLists((prevLists) => [
      ...prevLists,
      { id: `list-${Date.now()}`, title, cards: [] },
    ]);
  };

  const deleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const addCard = (listId, title) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { 
              ...list, 
              cards: [...list.cards, { 
                id: `card-${Date.now()}`, 
                title, 
                description: '', 
                dueDate: null 
              }] 
            }
          : list
      )
    );
  };

  const updateCard = (listId, cardId, updates) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId 
                  ? { ...card, ...updates } 
                  : card
              ),
            }
          : list
      )
    );
  };

  const deleteCard = (listId, cardId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            }
          : list
      )
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    // If no destination, exit
    if (!destination) return;

    if (type === 'CARD') {
      const newLists = [...lists];
      const sourceList = newLists.find((list) => list.id === source.droppableId);
      const destList = newLists.find((list) => list.id === destination.droppableId);

      if (sourceList && destList) {
        const [removedCard] = sourceList.cards.splice(source.index, 1);
        destList.cards.splice(destination.index, 0, removedCard);
        setLists(newLists);
      }
    } else if (type === 'LIST') {
      const newLists = Array.from(lists);
      const [movedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, movedList);

      setLists(newLists);
    }
  };

  const resetBoard = () => {
    setLists([]);
    localStorage.removeItem('trello-board');
  };

  return (
    <BoardContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        addCard,
        updateCard,
        deleteCard,
        resetBoard,
        onDragEnd: handleDragEnd,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
