import { Card, Text, Progress } from "@mantine/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

function CardList({ title, description, taskDone, nbTask, id }) {
  const pourcentage = (taskDone / nbTask) * 100;

  return (
    <StyledDiv>
      <Card
        className="Card"
        shadow="sm"
        padding="xl"
        component="a"
        href={`/list/${id}`}
        // target="_blank"
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
          <a href="#">
            <img
              className="Poubelle"
              src="./Images/Poubelle.svg"
              alt="PoubelleButton"
            />
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  taskDone: PropTypes.number.isRequired,
  nbTask: PropTypes.number.isRequired,
};

CardList.defaultProps = {
  title: "Default Title",
  description: "Default Description",
  taskDone: 5,
  nbTask: 10,
};

export default CardList;
