import { Card, Text, Progress } from "@mantine/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteChecklist } from "../Api/apiFunctions";

function CardList({ title, description, statut, id, todo, updateDelete }) {
  // Function to delete the checklist
  const handleDeleteClick = async (event) => {
    event.preventDefault(); // Prevents the default behavior of the link

    // Confirm if the user really wants to delete the checklist
    const confirmed = window.confirm(
      "Do you really want to delete this checklist?"
    );

    if (confirmed) {
      try {
        // Call the API function to delete the checklist
        const response = await deleteChecklist(id);
        if (response.done) {
          console.log("Checklist deleted successfully");
          // Call the function to update locally
          updateDelete(id);
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
      <Card className="Card" shadow="sm" padding="xl" radius="lg">
        <div className="Header">
          <Link className="LinkHeader" to={`/list/${id}`}>
            <Text className="Title" fw={800} size="xl" mt="md" ta="left">
              {title}
            </Text>
            <Text className="Description" fw={300} size="sm" mt="md" ta="left">
              {description}
            </Text>
          </Link>
          <div className="Icon">
            <Link className="Edit" to={`/form/${id}`}>
              <i className="fa-solid fa-pen" id="Edit" alt="EditButton"></i>
              <i
                className="fa-regular fa-trash-can"
                id="Trash"
                onClick={handleDeleteClick}
              ></i>
            </Link>
          </div>
        </div>
        <Link className="Footer" to={`/list/${id}`}>
          <Text className="Tasks" amt="xs" size="sm" ta="center">
            {status} : {taskDone} tasks on {nbTask} completed
          </Text>
          <Progress
            className="Progress"
            color="var(--blue)"
            radius="xl"
            size="xl"
            value={pourcentage}
            striped
            animated
          />
          <Text className="Tasks" amt="xs" size="sm" ta="center"></Text>
        </Link>
      </Card>
    </StyledDiv>
  );
}

// Styled components
const StyledDiv = styled.div`
  width: 50vw;
  margin: 20px auto;
  font-family: "Orbitron", sans-serif;
  filter: drop-shadow(0px 5px 2px #878787);

  .Card {
    background-color: var(--pink);
    color: white;
    padding: 0px 16px 16px 16px;
  }

  .Footer {
    text-decoration: none;
    color: inherit;
  }

  .Header {
    display: flex;
  }

  .LinkHeader {
    text-decoration: none;
    color: inherit;
    width: calc(100% - 25px);
  }

  .Title {
    overflow: hidden;

    margin-right: 7vw;
  }

  .Description {
    padding-bottom: 16px;
    padding-top: 0px;
    margin-right: 10vw;
    overflow: hidden;
  }

  .Icon {
    display: flex;
    margin-top: 15px;
  }

  .Tasks {
    margin-bottom: 5px;
  }

  .Edit {
    text-decoration: none;
    color: white;
  }

  #Edit {
    margin-bottom: 3vh;
    font-size: 17px;
  }

  #Trash {
    font-size: 17px;
  }

  @media screen and (max-width: 700px) {
    width: 60vw;
  }
`;

// PropTypes
CardList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  taskDone: PropTypes.number,
  nbTask: PropTypes.number,
  id: PropTypes.number,
  todo: PropTypes.array,
  updateDelete: PropTypes.func,
  statut: PropTypes.number,
};

// Default props
CardList.defaultProps = {
  title: "Default Title",
  description: "Default Description",
  taskDone: 1,
  nbTask: 0,
  statut: 0,
};

export default CardList;
