import React from 'react';
import './Item.css'
const Item = ({ item, onDragEnd }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default action
    e.dataTransfer.dropEffect = 'move'; // Set drop effect to move
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default action
    const draggedItemId = e.dataTransfer.getData('text/plain');
    if (draggedItemId !== item.id) {
      onDragEnd(draggedItemId, item.order);
    }
  };

  return (
    <div
      className="item" // Add CSS class for styling
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {item.content}
    </div>
  );
};

export default Item;