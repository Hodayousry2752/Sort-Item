import React, { useState } from 'react';
import Item from './Items';
import './SortableList.css';
const SortableList = () => {
  const [items, setItems] = useState([
    { id: 1, order: 1, content: 'Item 1' },
    { id: 2, order: 2, content: 'Item 2' },
    // Add more items as needed
  ]);

  const handleDragEnd = (draggedItemId, newOrder) => {
    const updatedItems = items.map(item =>
      item.id === draggedItemId ? { ...item, order: newOrder } : item
    );
    setItems(updatedItems);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const dropZoneOrder = parseInt(e.currentTarget.dataset.order);

    const draggedItem = items.find(item => item.id === parseInt(draggedItemId));
    const updatedItems = items.filter(item => item.id !== draggedItemId);

    const newOrder = dropZoneOrder + 1;

    const updatedList = [
      ...updatedItems.slice(0, dropZoneOrder),
      { ...draggedItem, order: newOrder },
      ...updatedItems.slice(dropZoneOrder)
    ];

    setItems(updatedList);
  };

  return (
    <div>
      <div className="drop-target" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} data-order={items.length}>
        {/* This is the drop target container */}
        Drop items here
      </div>
      {items.map(item => (
        <Item key={item.id} item={item} onDragEnd={handleDragEnd} />
      ))}
    </div>
  );
};

export default SortableList;
