// import styled from "styled-components";

// const AddTask = () => {
//   return (
//     <Add>
//       <i className="fa-solid fa-plus"></i>
//       <input type="text" placeholder="Add a task..." />
//     </Add>
//   );
// };

// // CSS
// const Add = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 30px;
//   text-decoration: none;

//   i {
//     margin-right: 20px;
//     font-size: 20px;

//     &:hover {
//       cursor: pointer;
//     }
//   }
//   input {
//     border: none;
//     outline: none;
//     font-size: 16px;
//     background-color: transparent;
//     color: white;
//     width: 150px;
//     &::placeholder {
//       color: white;
//     }
//   }
// `;

// export default AddTask;

import React, { useState } from "react";
import styled from "styled-components";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask(""); // Réinitialisez l'entrée après l'ajout de la tâche
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <Add>
      <i className="fa-solid fa-plus" onClick={handleAddTask}></i>
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

  i {
    margin-right: 20px;
    font-size: 20px;

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
    width: 150px;

    &::placeholder {
      color: white;
    }
  }
`;

export default AddTask;
