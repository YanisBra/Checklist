import { Card, Text, Progress } from "@mantine/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteChecklist } from "../Api/apiFunctions";

function CardList({ title, description, statut, id, todo }) {
  const handleDeleteClick = async (event) => {
    event.preventDefault(); // Prevents the default behavior of the link

    const confirmed = window.confirm(
      "Do you really want to delete this checklist?"
    );

    if (confirmed) {
      try {
        const response = await deleteChecklist(id);
        if (response.done) {
          console.log("Checklist deleted successfully");
          // Refresh the page after deletion
          window.location.reload();
        } else {
          console.log("Checklist deletion failed");
        }
      } catch (error) {
        console.error("Error deleting checklist:", error);
      }
    }
  };

  // Determine the status based on the statut value
  const status =
    statut === 0 ? "Not started" : statut === 1 ? "In progress" : "Completed";

  // Number of tasks in the todo
  const nbTask = todo.length;

  // Number of tasks done in the todo
  const taskDone = todo.filter((task) => task.statut === 2).length;

  // Percentage of tasks done compared to the total
  const pourcentage = (taskDone / nbTask) * 100;

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
          <i
            className="fa-regular fa-trash-can"
            id="Trash"
            onClick={handleDeleteClick}
          ></i>
        </Text>

        <Text className="Tasks" amt="xs" size="sm" ta="center">
          {status} : {taskDone} tasks on {nbTask} completed
        </Text>
        <Progress
          className="Progress"
          color="#26547C"
          radius="xl"
          size="xl"
          value={pourcentage}
          striped
          animated
        />
        <Text className="Tasks" amt="xs" size="sm" ta="center"></Text>
      </Card>
    </StyledDiv>
  );
}

//CSS
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
    overflow: hidden;
  }
  .Tasks {
    margin-bottom: 5px;
  }
  .Edit {
    height: 25px;
  }

  .Edit,
  #Trash {
    height: 20px;
    position: absolute;
    right: 2vh;
    color: white;
    font-size: 17px;
  }

  @media screen and (max-width: 700px) {
    width: 60vw;
  }
`;

//propTypes
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
