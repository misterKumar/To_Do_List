import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormArea = styled.div`
  display: flex;
  justify-content: center;
  background-color: #24272b;
  padding: 30px;
  margin: 10px;
  color: white;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;

const ItemInput = styled.input`
  width: 100%;
  font-size: 22px;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  width: 100%;
  background-color: #44bba4;
  color: white;
  font-size: 22px;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddToDoForm = ({ onAddToDo, handleChange, inputValue, addToDoItem }) => {
  return (
    <FormArea>
      <Form onSubmit={addToDoItem}>
        <ItemInput
          onChange={handleChange}
          value={inputValue}
          placeholder="Enter Task"
        />
        <AddButton type="submit">Add</AddButton>
      </Form>
    </FormArea>
  );
};

AddToDoForm.propTypes = {
  onAddToDo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  addToDoItem: PropTypes.func.isRequired,
};

export default AddToDoForm;
