
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('can add a new task', async () => {
  render(<App />);
  const addButton = screen.getByText(/Add/i);
  const inputField = screen.getByPlaceholderText('Enter Task');
  
  fireEvent.change(inputField, { target: { value: 'New Task' } });
  fireEvent.click(addButton);
  
  const newTask = screen.getByText('New Task');
  
  expect(newTask).toBeInTheDocument();
});

test('can mark a task as complete', async () => {
  render(<App />);
  const task = screen.getByText('New Task');
  
  fireEvent.click(task);
  
  const completedTask = await screen.findByText('New Task', {style: { textDecoration: 'line-through' }});
  
  expect(completedTask).toBeInTheDocument();
});

test('can delete a task', () => {
  render(<App />);
  const deleteButton = screen.getByText(/Delete/i);
  
  fireEvent.click(deleteButton);
  
  const deletedTask = screen.queryByText('New Task');
  
  expect(deletedTask).not.toBeInTheDocument();
});