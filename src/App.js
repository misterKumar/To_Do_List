import React, { useState, useCallback } from 'react';
import ToDoList from './components/ToDoList';
import AddToDoForm from './components/AddToDoForm';
import { getToDoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './service/service';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditInput = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 8px;
  margin-bottom: 8px;
`;

const UpdateButton = styled.button`
  background-color: #44bba4;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
`;

const App = () => {
  const [todoItems, setTodoItems] = useState(getToDoItemsFromLocalStorage('item') || []);
  const [inputValue, setInputValue] = useState("");
  const [editTask, setEditTask] = useState({ id: null, content: '' });

  const handleAddToDo = useCallback(item => {
    const items = [
      {
        id: item.id,
        content: item.content,
        complete: item.complete
      },
      ...todoItems,
    ];
    setTodoItems(items);
    saveTodoItemsToLocalStorage('item', items);
  }, [todoItems]);

  const handleOnDelete = useCallback(id => {
    const newTodoItems = todoItems.filter(item => item.id !== id);
    setTodoItems(newTodoItems);
    saveTodoItemsToLocalStorage('item', newTodoItems);
  }, [todoItems]);

  const handleOnToggleComplete = useCallback(id => {
    const updatedItems = todoItems.map(item =>
      item.id === id ? { ...item, complete: !item.complete } : item
    );
    setTodoItems(updatedItems);
    saveTodoItemsToLocalStorage('item', updatedItems);
  }, [todoItems]);

  const handleOnEdit = useCallback(id => {
    const taskToEdit = todoItems.find(item => item.id === id);
    setEditTask({ id, content: taskToEdit.content });
  }, [todoItems]);

  const handleEditChange = e => {
    setEditTask({ ...editTask, content: e.target.value });
  };

  const handleUpdateTask = e => {
    e.preventDefault();
    const updatedItems = todoItems.map(item =>
      item.id === editTask.id ? { ...item, content: editTask.content } : item
    );
    setTodoItems(updatedItems);
    saveTodoItemsToLocalStorage('item', updatedItems);
    setEditTask({ id: null, content: '' });
  };

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const addToDoItem = e => {
    e.preventDefault();

    const item = {
      id: uuidv4(),
      content: inputValue,
      complete: false
    };

    handleAddToDo(item);
    setInputValue("");
  };

  const renderEditForm = () => {
    if (editTask.id !== null) {
      return (
        <EditForm onSubmit={handleUpdateTask}>
          <EditInput
            type="text"
            value={editTask.content}
            onChange={handleEditChange}
          />
          <UpdateButton type="submit">Update</UpdateButton>
        </EditForm>
      );
    }
  };

  return (
    <AppContainer>
      <h1>Todo List</h1>
      <AddToDoForm
        onAddToDo={handleAddToDo}
        handleChange={handleChange}
        inputValue={inputValue}
        addToDoItem={addToDoItem}
      />
      {renderEditForm()}
      <ToDoList
        toDoItems={todoItems}
        onDeleteToDo={handleOnDelete}
        onToggle={handleOnToggleComplete}
        onEdit={handleOnEdit}
      />
    </AppContainer>
  );
};

export default App;
