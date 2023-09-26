import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const ToDoList = ({ toDoItems, onDeleteToDo, onToggle, onEdit }) => {
  return (
    <ul>
      {toDoItems.map(({ id, content, complete }) => (
        <Item
          key={id}
          id={id}
          content={content}
          complete={complete}
          onDeleteToDo={onDeleteToDo}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

ToDoList.propTypes = {
  toDoItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteToDo: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ToDoList;
