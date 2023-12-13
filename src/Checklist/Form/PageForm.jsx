import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Button } from "@mantine/core";
import AddTask from "../Composants/AddTask";
import { useParams, useNavigate } from "react-router-dom";
import FormHeader from "../Composants/FormHeader";
import {
  updateChecklist,
  updateChecklistStatus,
  getChecklistById,
} from "../Api/apiFunctions";
import WhiteTask from "../Composants/WhiteTask";
import uniqid from "uniqid";

function PageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State for checklist details and form inputs
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
  });

  // Fetch checklist details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getChecklistById(id);
        console.log("API Response:", apiResponse);

        // Update the state including title, description, and tasks
        setChecklist(apiResponse);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to handle title change
  const handleTitleChange = (value) => {
    setTitle(value);
  };

  // Function to handle description change
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  // Function to add a new task to the checklist
  const handleAddTask = (task) => {
    const newTask = {
      title: task,
      description: uniqid(),
      statut: 0,
    };

    // Update the todo list of the checklist state by adding the new task
    setChecklist((prevChecklist) => ({
      ...prevChecklist,
      todo: [...prevChecklist.todo, newTask],
    }));
  };

  // Function to delete a task from the checklist
  const handleDeleteTask = (taskId) => {
    setChecklist((prevChecklist) => {
      const updatedTodo = prevChecklist.todo.filter(
        (task) => task.description !== taskId
      );
      return {
        ...prevChecklist,
        todo: updatedTodo,
      };
    });
  };

  // Function to update the status of a task in the checklist
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setChecklist((prevChecklist) => {
      const updatedTodo = prevChecklist.todo.map((task) =>
        task.description === taskId ? { ...task, statut: newStatus } : task
      );

      return {
        ...prevChecklist,
        todo: updatedTodo,
      };
    });
  };

  // Function to update the title of a task in the checklist
  const handleUpdateTaskTitle = (taskId, newTitle) => {
    setChecklist((prevChecklist) => {
      const updatedTodo = prevChecklist.todo.map((task) =>
        task.description === taskId ? { ...task, title: newTitle } : task
      );

      return {
        ...prevChecklist,
        todo: updatedTodo,
      };
    });
  };

  // Function to handle saving the updated checklist
  const handleSave = async () => {
    try {
      // Step 1: Check the state of tasks
      const areAllTasksDone = checklist.todo.every((task) => task.statut === 2);
      const isAnyTaskDone = checklist.todo.some((task) => task.statut === 2);

      // Step 2: Determine the new checklist status based on tasks
      let newChecklistStatus = 0;

      if (areAllTasksDone) {
        newChecklistStatus = 2; // If all tasks are done, checklist status is set to 2
      } else if (isAnyTaskDone) {
        newChecklistStatus = 1; // If at least one task is done, checklist status is set to 1
      }

      // Step 3: Update the checklist status
      console.log("newChecklistStatus", newChecklistStatus);
      await updateChecklistStatus(id, newChecklistStatus);

      // Step 4: Update the checklist
      const response = await updateChecklist(
        id,
        title !== "" ? title : checklist.title,
        description !== "" ? description : checklist.description,
        checklist.todo
      );

      // Step 5: Update the local checklist status
      setChecklist((prevChecklist) => ({
        ...prevChecklist,
        statut: newChecklistStatus,
      }));

      // Step 6: Navigate to the dashboard after saving
      navigate("/");

      console.log("Checklist updated successfully:", response);
    } catch (error) {
      console.error("Error updating the checklist:", error);
    }
  };

  // Function to place checked tasks below others
  const sortedTasks = [...checklist.todo].sort((a, b) => a.statut - b.statut);

  return (
    <StyledDiv>
      <Card
        className="Card"
        shadow="sm"
        padding="xl"
        component="div"
        radius="xl"
      >
        <FormHeader
          title={checklist.title}
          description={checklist.description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />
        <div>
          {sortedTasks.map(({ title, statut, description }) => (
            <WhiteTask
              key={description}
              title={title}
              statut={statut}
              description={description}
              onChange={handleUpdateTaskStatus}
              onUpdateTitle={handleUpdateTaskTitle}
              onDelete={() => handleDeleteTask(description)}
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
  );
}

//Styled components
const StyledDiv = styled.div`
  width: 35vw;
  height: 70;
  margin: 5vh auto;
  filter: drop-shadow(0px 5px 2px #878787);
  margin-top: 15vh;

  @media screen and (max-height: 700px) {
    margin-top: 125px;
  }

  .Card {
    background-color: var(--pink);
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

PageForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  todo: PropTypes.array,
};

export default PageForm;
