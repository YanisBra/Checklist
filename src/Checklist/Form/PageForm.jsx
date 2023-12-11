// import { Card, Button } from "@mantine/core";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import uniqid from "uniqid";
// import AddTask from "../Composants/AddTask";
// import FormHeader from "../Composants/FormHeader";
// import CheckBox from "../Composants/CheckBox";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   getTasksByChecklistId,
//   updateChecklist,
//   updateChecklistStatus,
// } from "../Api/apiFunctions";
// import WhiteTask from "../Composants/WhiteTask";

// function PageForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [checklist, setChecklist] = useState({
//     title: "",
//     description: "",
//     todo: [],
//   });
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiResponse = await getTasksByChecklistId(id);
//         console.log("API Response:", apiResponse);

//         // Mettez à jour l'état en incluant le titre, la description et les tâches
//         setChecklist(apiResponse);

//         // Mettez à jour l'état des tâches créées localement
//       } catch (error) {
//         console.error("Erreur lors de la récupération des tâches :", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleTitleChange = (value) => {
//     setTitle(value);
//   };

//   const handleDescriptionChange = (value) => {
//     setDescription(value);
//   };

//   const handleAddTask = (task) => {
//     const newTask = {
//       title: task,
//       description: uniqid(),
//       statut: 0,
//     };

//     // Mettez à jour la liste todo de l'état checklist en ajoutant la nouvelle tâche
//     setChecklist((prevChecklist) => ({
//       ...prevChecklist,
//       todo: [...prevChecklist.todo, newTask],
//     }));
//   };

//   const handleDeleteTask = (taskId) => {
//     setChecklist((prevChecklist) => {
//       const updatedTodo = prevChecklist.todo.filter(
//         (task) => task.description !== taskId
//       );
//       return {
//         ...prevChecklist,
//         todo: updatedTodo,
//       };
//     });
//   };

//   const handleUpdateTaskStatus = (taskId, newStatus) => {
//     setChecklist((prevChecklist) => {
//       const updatedTodo = prevChecklist.todo.map((task) =>
//         task.description === taskId ? { ...task, statut: newStatus } : task
//       );

//       return {
//         ...prevChecklist,
//         todo: updatedTodo,
//       };
//     });
//   };

//   const handleUpdateTaskTitle = (taskId, newTitle) => {
//     setChecklist((prevChecklist) => {
//       const updatedTodo = prevChecklist.todo.map((task) =>
//         task.description === taskId ? { ...task, title: newTitle } : task
//       );

//       return {
//         ...prevChecklist,
//         todo: updatedTodo,
//       };
//     });
//   };

//   const handleSave = async () => {
//     try {
//       // Step 1: Check the state of tasks
//       const areAllTasksDone = checklist.todo.every((task) => task.statut === 2);
//       const isAnyTaskDone = checklist.todo.some((task) => task.statut === 2);

//       // Step 2: Determine the new checklist status based on tasks
//       let newChecklistStatus = 0;

//       if (areAllTasksDone) {
//         newChecklistStatus = 2; // If all tasks are done, checklist status is set to 2
//       } else if (isAnyTaskDone) {
//         newChecklistStatus = 1; // If at least one task is done, checklist status is set to 1
//       }

//       // Step 3: Update the checklist status
//       console.log("newChecklistStatus", newChecklistStatus);
//       await updateChecklistStatus(id, newChecklistStatus);

//       // Step 4: Update the checklist
//       const response = await updateChecklist(
//         id,
//         title !== "" ? title : checklist.title,
//         description !== "" ? description : checklist.description,
//         checklist.todo
//       );

//       // Step 5: Update the local checklist status
//       setChecklist((prevChecklist) => ({
//         ...prevChecklist,
//         statut: newChecklistStatus,
//       }));

//       // Step 6: Navigate to the dashboard after saving
//       navigate("/");

//       console.log("Checklist updated successfully:", response);
//     } catch (error) {
//       console.error("Error updating the checklist:", error);
//     }
//   };

//   //fonction qui permet de mettre les tasks checks en dessous des autres
//   const sortedTasks = [...checklist.todo].sort((a, b) => a.statut - b.statut);

//   return (
//     <StyledDiv>
//       <Card
//         className="Card"
//         shadow="sm"
//         padding="xl"
//         component="div"
//         radius="xl"
//       >
//         <FormHeader
//           title={checklist.title}
//           description={checklist.description}
//           onTitleChange={handleTitleChange}
//           onDescriptionChange={handleDescriptionChange}
//         />
//         <div>
//           {sortedTasks.map(({ title, statut, description }) => (
//             <WhiteTask
//               key={description}
//               title={title}
//               statut={statut}
//               description={description}
//               onChange={handleUpdateTaskStatus}
//               onUpdateTitle={handleUpdateTaskTitle}
//               onDelete={() => handleDeleteTask(description)}
//             />
//           ))}
//         </div>
//         <div>
//           <AddTask onAddTask={handleAddTask} />
//         </div>
//         <Button
//           className="Button"
//           variant="outline"
//           color="rgba(255, 255, 255, 1)"
//           size="md"
//           radius="xl"
//           onClick={handleSave}
//         >
//           Save
//         </Button>
//       </Card>
//     </StyledDiv>
//   );
// }

// //CSS
// const StyledDiv = styled.div`
//   width: 50vw;
//   height: 70;
//   margin: 5vh auto;
//   filter: drop-shadow(0px 5px 2px #878787);
//   margin-top: 15vh;
//   .Card {
//     background-color: #ef476f;
//     color: white;
//     padding: 0px 16px 16px 16px;
//   }
//   .Edit {
//     height: 25px;
//   }

//   .Edit,
//   .Poubelle {
//     height: 20px;
//     position: fixed;
//     right: 2vh;
//   }

//   .Edit {
//     top: 4vw;
//   }

//   .Poubelle {
//     top: 10vw;
//   }

//   .Button {
//     width: 40%;
//     margin: auto;
//   }

//   @media screen and (max-width: 700px) {
//     width: 80vw;
//   }
// `;

// PageForm.propTypes = {
//   // Utilisation de PropTypes pour définir le type de chaque propriété
//   id: PropTypes.string,
//   title: PropTypes.string,
//   description: PropTypes.string,
//   todo: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       statut: PropTypes.number,
//       description: PropTypes.string,
//     })
//   ),
// };

// export default PageForm;

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
  getTasksByChecklistId,
} from "../Api/apiFunctions";
import WhiteTask from "../Composants/WhiteTask";
import uniqid from "uniqid";

function PageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        // Update the state including title, description, and tasks
        setChecklist(apiResponse);

        // Update the state of locally created tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

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

//CSS
const StyledDiv = styled.div`
  width: 50vw;
  height: 70;
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

  @media screen and (max-width: 700px) {
    width: 80vw;
  }
`;

PageForm.propTypes = {
  // Utilisation de PropTypes pour définir le type de chaque propriété
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      statut: PropTypes.number,
      description: PropTypes.string,
    })
  ),
};

export default PageForm;
