import { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import RedTask from "../Composants/RedTask";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { getTasksByChecklistId } from "../Api/apiFunctions";
import { updateChecklist, updateChecklistStatus } from "../Api/apiFunctions";

const PageList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        // Mettez à jour l'état en incluant le titre, la description et les tâches
        setChecklist(apiResponse);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [id]);

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
      console.log("Checklist mise à jour avec succès :", response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la checklist :", error);
    }
  };

  // Tri des tâches par l'état "done"
  const sortedTasks = [...checklist.todo].sort((a, b) => a.done - b.done);

  return (
    <>
      <StyledList>
        <h1>{checklist.title}</h1>
        <h2>{checklist.description}</h2>
        {sortedTasks.map(({ title, description, statut }) => (
          <RedTask
            key={uniqid}
            title={title}
            description={description}
            statut={statut}
            onChange={handleUpdateTaskStatus}
          />
        ))}
      </StyledList>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

//CSS
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
    margin: 20px 100px;
  }
`;

//PropTypes
PageList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired, // Ajout de cette ligne
};

PageList.defaultProps = {
  title: "Checklist 1",
  description: "Description",
  todo: [],
  statut: 0,
};

export default PageList;
