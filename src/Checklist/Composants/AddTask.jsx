import React, { useState } from "react";
import styled from "styled-components";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  // Handles input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Handles task addition
  const handleTaskAdd = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask(""); // Resets input after adding the task
    }
  };

  // Enter key for adding a task
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTaskAdd();
    }
  };

  return (
    <AddContainer>
      <input
        type="text"
        placeholder="New Task..."
        value={task}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <i className="fa-solid fa-plus" onClick={handleTaskAdd}></i>
    </AddContainer>
  );
};

// Styled Components
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  text-decoration: none;
  background-color: #f78aa2;
  border-radius: 10px;
  height: 30px;

  i {
    margin-right: 10px;
    font-size: 20px;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  input {
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    color: white;
    width: 70vw;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: white;
    }
  }
`;

export default AddTask;
