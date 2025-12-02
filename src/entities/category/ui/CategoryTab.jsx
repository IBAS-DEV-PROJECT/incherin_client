import React from 'react';

export const CategoryTab = ({ category, onClick }) => {
  return <button onClick={onClick}>{category.name}</button>;
};
