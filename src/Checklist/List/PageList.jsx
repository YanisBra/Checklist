import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mantine/core";
import RedTask from "../Composants/RedTask";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateChecklist,
  updateChecklistStatus,
  getTasksByChecklistId,
} from "../Api/apiFunctions";

const PageList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold checklist details
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
  });

  // Fetch checklist details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        // Update the state including title, description, and tasks
        setChecklist(apiResponse);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to handle updating the status of a task
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
        checklist.title,
        checklist.description,
        checklist.todo
      );

      // Step 5: Navigate to the dashboard after saving
      navigate("/");
      console.log("Checklist updated successfully:", response);
    } catch (error) {
      console.error("Error updating the checklist:", error);
    }
  };

  // Sort tasks by "done" status
  const sortedTasks = [...checklist.todo].sort((a, b) => a.statut - b.statut);

  // Determine checklist status text
  const status =
    checklist.statut === 0
      ? "Not started"
      : checklist.statut === 1
      ? "In progress"
      : "Completed";

  // JSX structure of the component
  return (
    <>
      <StyledList>
        <h1>{checklist.title}</h1>
        <h2>{checklist.description}</h2>
        <h3>({status})</h3>
        {sortedTasks.map(({ title, description, statut }) => (
          <RedTask
            key={description}
            title={title}
            description={description}
            statut={statut}
            onChange={handleUpdateTaskStatus}
          />
        ))}
        <Button
          className="Button"
          variant="filled"
          radius="lg"
          onClick={handleSave}
        >
          Save
        </Button>
      </StyledList>
    </>
  );
};

// CSS
const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 13vh;
  color: #ef476f;
  & h1 {
    font-weight: 900;
    font-size: 40px;
    text-align: center;
  }

  & h2 {
    font-weight: bold;
    font-size: 17px;
    margin-top: 20px;
    text-align: center;
    margin: 20px auto 0px auto;
  }

  & h3 {
    font-size: 15px;
    text-align: center;
    margin: 20px auto;
  }

  .Button {
    background-color: #ef476f;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    z-index: 1000;
    height: 6vh;
    width: 20vw;
    max-width: 150px;
    min-width: 100px;
    font-size: 20px;
    filter: drop-shadow(0px 3px 2px #303030);
  }

  @media screen and (max-width: 700px) {
    .Button {
      font-size: 15px;
    }
  }
`;

// PropTypes
PageList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  statut: PropTypes.number.isRequired,
};

PageList.defaultProps = {
  title: "Checklist 1",
  description: "Description",
  todo: [],
  statut: 0,
};

export default PageList;
