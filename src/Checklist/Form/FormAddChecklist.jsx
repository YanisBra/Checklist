import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button } from "@mantine/core";
import AddTask from "../Composants/AddTask";
import { useNavigate } from "react-router-dom";
import FormHeader from "../Composants/FormHeader";
import { addChecklist } from "../Api/apiFunctions";
import WhiteTask from "../Composants/WhiteTask";
import uniqid from "uniqid";

function FormAddChecklist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  // Function to handle title change
  const handleTitleChange = (value) => {
    setTitle(value);
  };

  // Function to handle description change
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  // Function to add a new task
  const handleAddTask = (task) => {
    const newTask = {
      title: task,
      description: uniqid(),
      statut: 0,
    };
    setTodo((prevTodo) => [...prevTodo, newTask]);
  };

  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    setTodo((prevTasks) => {
      const updatedTasks = prevTasks.filter(
        (task) => task.description !== taskId
      );
      return updatedTasks;
    });
  };

  // Function to update the title of a task
  const handleUpdateTaskTitle = (taskId, newTitle) => {
    setTodo((prevTodo) => {
      const updatedTodo = prevTodo.map((task) =>
        task.description === taskId ? { ...task, title: newTitle } : task
      );
      return updatedTodo;
    });
  };

  // Function to handle saving the checklist
  const handleSave = async () => {
    try {
      console.log("Current state before sending:", {
        title,
        description,
        todo,
      });

      const response = await addChecklist(title, description, todo);
      console.log("Checklist added successfully:", response);
      navigate("/"); // Return to the dashboard after saving
    } catch (error) {
      console.error("Error adding the checklist:", error);
    }
  };

  return (
    <>
      <StyledDiv>
        <Card
          className="Card"
          shadow="sm"
          padding="xl"
          component="div"
          radius="xl"
        >
          <FormHeader
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          <div>
            {todo.map((task) => (
              <WhiteTask
                key={task.description}
                title={task.title}
                description={task.description}
                onDelete={() => handleDeleteTask(task.description)}
                onUpdateTitle={handleUpdateTaskTitle}
              />
            ))}
          </div>
          <div>
            <AddTask onAddTask={handleAddTask} />
          </div>

          <Button
            className="Button"
            variant="outline"
            color="rgba(255, 255, 255, 1)"
            size="md"
            radius="xl"
            onClick={handleSave}
          >
            Save
          </Button>
        </Card>
      </StyledDiv>
    </>
  );
}

// Styled components
const StyledDiv = styled.div`
  width: 35vw;
  margin: 5vh auto;
  filter: drop-shadow(0px 5px 2px #878787);
  margin-top: 15vh;
  .Card {
    background-color: #ef476f;
    color: white;
    padding: 0px 16px 16px 16px;
  }
  .Edit {
    height: 25px;
  }

  .Edit,
  .Poubelle {
    height: 20px;
    position: fixed;
    right: 2vh;
  }

  .Edit {
    top: 4vw;
  }

  .Poubelle {
    top: 10vw;
  }

  .Button {
    width: 40%;
    margin: auto;
  }

  @media screen and (max-width: 1100px) {
    width: 60vw;
  }

  @media screen and (max-width: 700px) {
    width: 80vw;
  }
`;

export default FormAddChecklist;
