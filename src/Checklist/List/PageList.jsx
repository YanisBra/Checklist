// import styled from "styled-components";
// import uniqid from "uniqid";
// import Task from "./RedTask";
// import PropTypes from "prop-types";
// import checklistsData from "../Data/checklistsData";
// import { useParams } from "react-router-dom";

// const PageList = () => {
//   const { id } = useParams();
//   const checklist = checklistsData.find((item) => item.id === parseInt(id));

//   // Tri des tâches par l'état "done"
//   const sortedTasks = [...checklist.tasks].sort((a, b) => a.done - b.done);

//   return (
//     <>
//       <StyledList>
//         <h1>{checklist.title}</h1>
//         <h2>{checklist.description}</h2>
//         {sortedTasks.map(({ task, done }) => (
//           <Task key={uniqid()} task={task} done={done} />
//         ))}
//       </StyledList>
//     </>
//   );
// };

// //CSS
// const StyledList = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;
//   margin-top: 13vh;
//   color: #ef476f;
//   & h1 {
//     font-weight: 900;
//     font-size: 40px;
//   }

//   & h2 {
//     font-weight: normal;
//     font-size: 15px;
//     margin-top: 20px;
//     text-align: center;
//     margin: 20px 100px;
//   }
// `;

// //Props

// PageList.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

// PageList.defaultProps = {
//   title: "Checklist 1",
//   description: "Description",
// };

// export default PageList;

import { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import RedTask from "./RedTask";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getTasksByChecklistId } from "../Api/apiFunctions";

const PageList = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    tasks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        // Assurez-vous que apiResponse.todo est défini, sinon utilisez un tableau vide
        const tasks = apiResponse.todo || [];

        // Mettez à jour l'état en incluant le titre et la description
        setChecklist({
          title: apiResponse.title || "", // Assurez-vous que apiResponse.title est défini, sinon utilisez une chaîne vide
          description: apiResponse.description || "", // Assurez-vous que apiResponse.description est défini, sinon utilisez une chaîne vide
          tasks: tasks,
          statut: apiResponse.statut || 0,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [id]);

  // Tri des tâches par l'état "done"
  const sortedTasks = [...checklist.tasks].sort((a, b) => a.done - b.done);

  return (
    <>
      <StyledList>
        <h1>{checklist.title}</h1>
        <h2>{checklist.description}</h2>
        {sortedTasks.map(({ title, statut }) => (
          <RedTask
            key={uniqid()}
            task={title.title} // Assurez-vous d'ajuster en fonction de la structure réelle de votre objet
            done={statut === 1} // Supposons que statut égal à 1 signifie "done"
          />
        ))}
      </StyledList>
    </>
  );
};

// Le reste du code reste inchangé...

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
  }

  & h2 {
    font-weight: normal;
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
    margin: 20px 100px;
  }
`;

PageList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired, // Ajout de cette ligne
};

PageList.defaultProps = {
  title: "Checklist 1",
  description: "Description",
  tasks: [],
  statut: 0,
};

export default PageList;
