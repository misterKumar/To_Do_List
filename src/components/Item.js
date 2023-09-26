import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemArea = styled.div`
  display: flex;
  justify-content: flex-start;
  background: #f4f7fa;
  border: 2px solid #24272b;
  color: black;
  font-size: 22px;
  padding: 8px;
  margin: 2px;
`;

const ListItem = styled.div`
  width: 90%;
`;

const DeleteButton = styled.button`
  background: #44bba4;
  border: 1px solid #44bba4;
  color: white;
  width: 10%;
  padding: 10px;
  margin-left: 15px;
  border-radius: 3px;
`;

const EditButton = styled.button`
  background: #007bff;
  border: 1px solid #007bff;
  color: white;
  width: 10%;
  padding: 10px;
  margin-left: 15px;
  border-radius: 3px;
`;

const EditInput = styled.input`
  width: 100%;
  font-size: 22px;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Item = ({ id, content, complete, onDeleteToDo, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleOnDelete = useCallback(() => onDeleteToDo(id), [id, onDeleteToDo]);
  const handleOnToggle = useCallback(() => onToggle(id), [id, onToggle]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit(id, editedContent);
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <ItemArea>
      <ListItem>
        {isEditing ? (
          <>
            <EditInput
              type="text"
              value={editedContent}
              data-testid="edit-input" 
              onChange={handleInputChange}
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <p
              style={{ textDecoration: complete ? 'line-through' : '' }}
              onClick={handleOnToggle}
            >
              {content}
            </p>
            <EditButton onClick={handleEditClick}>Edit</EditButton>
          </>
        )}
      </ListItem>
      <DeleteButton onClick={handleOnDelete}>Delete</DeleteButton>
    </ItemArea>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  onDeleteToDo: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Item;
