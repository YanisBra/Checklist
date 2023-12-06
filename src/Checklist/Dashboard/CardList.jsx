import { Card, Text, Progress } from "@mantine/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteChecklist } from "../Api/apiFunctions";

const StyledDiv = styled.div`
  width: 50vw;
  margin: 20px auto;
  font-family: "Orbitron", sans-serif;
  filter: drop-shadow(0px 5px 2px #878787);
  .Card {
    background-color: #ef476f;
    color: white;
    padding: 0px 16px 16px 16px;
  }

  .Description {
    padding-bottom: 16px;
    padding-top: 0px;
    margin-right: 10vw;
  }
  .Tasks {
    margin-bottom: 5px;
  }
  .Edit {
    height: 25px;
  }

  .Edit,
  .Poubelle {
    height: 20px;
    position: fixed;
    right: 2vh;
    color: white;
    font-size: 17px;
  }

  .Edit {
    float: right;
  }

  .Poubelle {
    float: left;
  }

  @media screen and (max-width: 700px) {
    width: 60vw;
  }
`;

function CardList({ title, description, id, todo }) {
  const handleDeleteClick = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du lien

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette checklist ?"
    );

    if (confirmed) {
      try {
        const response = await deleteChecklist(id);
        if (response.done) {
          console.log("Checklist supprimée avec succès");
          // Actualise la page après la suppression
          window.location.reload();
        } else {
          console.log("La suppression de la checklist a échoué");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la checklist :", error);
      }
    }
  };

  //Nombre de task dans mon todo
  const nbTask = todo.length;

  //nombre de task done dans le todo
  const taskDone = todo.filter((task) => task.statut === 2).length;

  //pourcentage sur le nombre de task done sur le total
  const pourcentage = (taskDone / nbTask) * 100;

  // console.log("nbTask :", nbTask, "taskDone :", taskDone);

  return (
    <StyledDiv>
      <Card
        className="Card"
        shadow="sm"
        padding="xl"
        component={Link}
        to={`/list/${id}`}
        radius="lg"
      >
        <Text className="Title" fw={800} size="xl" mt="md" ta="left">
          {title}
          <Link to={`/form/${id}`}>
            <img className="Edit" src="./Images/Edit.svg" alt="EditButton" />
          </Link>
        </Text>

        <Text className="Description" fw={300} size="sm" mt="md" ta="left">
          {description}
          <a href="#" className="Poubelle" onClick={handleDeleteClick}>
            <i className="fa-regular fa-trash-can"></i>
          </a>
        </Text>

        <Text className="Tasks" amt="xs" size="sm" ta="center">
          {taskDone} task on {nbTask} completed
        </Text>
        <Progress
          color="#26547C"
          radius="xl"
          size="xl"
          value={pourcentage}
          striped
          animated
        />
      </Card>
    </StyledDiv>
  );
}

CardList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  taskDone: PropTypes.number,
  nbTask: PropTypes.number,
  id: PropTypes.number,
};

CardList.defaultProps = {
  title: "Default Title",
  description: "Default Description",
  taskDone: 1,
  nbTask: 0,
};

export default CardList;
