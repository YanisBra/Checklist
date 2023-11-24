import { Card, Text, Progress } from "@mantine/core";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  width: 50vw;
  height: 10vh;
  margin: 5vh auto;
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
    top: 4vw;
  }

  .Poubelle {
    top: 10vw;
  }
`;

function CardList({ title, description, taskDone, nbTask }) {
  const pourcentage = (taskDone / nbTask) * 100;

  return (
    <StyledDiv>
      <Card
        className="Card"
        shadow="sm"
        padding="xl"
        component="a"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        radius="lg"
      >
        <Text className="Title" fw={800} size="xl" mt="md" ta="left">
          {title}
        </Text>
        <Text className="Description" fw={300} size="sm" mt="md" ta="left">
          {description}
        </Text>
        <a href="#">
          <img className="Edit" src="./Images/Edit.svg" alt="EditButton" />
        </a>
        <a href="#">
          <img
            className="Poubelle"
            src="./Images/Poubelle.svg"
            alt="PoubelleButton"
          />
        </a>
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
