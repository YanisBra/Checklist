import { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import RedTask from "../Composants/RedTask";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getTasksByChecklistId } from "../Api/apiFunctions";

const PageList = () => {
  const { id } = useParams();
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

  console.log("apres modif : ", checklist);
  // Tri des tâches par l'état "done"
  const sortedTasks = [...checklist.todo].sort((a, b) => a.done - b.done);

  return (
    <>
      <StyledList>
        <h1>{checklist.title}</h1>
        <h2>{checklist.description}</h2>
        {sortedTasks.map(({ title, statut }) => (
          <RedTask
            key={uniqid()}
            title={title} // Assurez-vous d'ajuster en fonction de la structure réelle de votre objet
            statut={statut === 1} // Supposons que statut égal à 1 signifie "done"
          />
        ))}
      </StyledList>
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
