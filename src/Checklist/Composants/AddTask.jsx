import React, { useState } from "react";
import styled from "styled-components";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskAdd = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask(""); // Réinitialisez l'entrée après l'ajout de la tâche
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTaskAdd();
    }
  };

  return (
    <Add>
      <i className="fa-solid fa-plus" onClick={handleTaskAdd}></i>
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </Add>
  );
};

// CSS
const Add = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  text-decoration: none;
  background-color: #f78aa2;
  border-radius: 10px;
  height: 30px;

  i {
    margin-right: 20px;
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
    width: 50vw;

    &::placeholder {
      color: white;
    }
  }
`;

export default AddTask;
