import CardList from "./CardList";
import styled from "styled-components";
import uniqid from "uniqid";
import { Button } from "@mantine/core";

//Tableau des chekclists
const checklists = [
  {
    title: "Checklist 1",
    description: "Description for Checklist 1",
    taskDone: 3,
    nbTask: 5,
  },
  {
    title: "Checklist 2",
    description: "Description for Checklist 2",
    taskDone: 2,
    nbTask: 7,
  },
  {
    title: "Checklist 3",
    description: "Description for Checklist 3",
    taskDone: 4,
    nbTask: 6,
  },
  {
    title: "Checklist 4",
    description: "Description for Checklist 4",
    taskDone: 1,
    nbTask: 8,
  },
  {
    title: "Checklist 5",
    description: "Description for Checklist 5",
    taskDone: 5,
    nbTask: 5,
  },
];

const PageDashboard = () => {
  return (
    <StyledDashboard>
      <ContainerDiv>
        {checklists.map((list) => (
          <CardList key={uniqid} {...list} />
        ))}
      </ContainerDiv>
      <Button className="Button" variant="filled" size="md" radius="lg">
        Add Checklist
      </Button>
    </StyledDashboard>
  );
};

//CSS
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-top: 10vh;
`;

const StyledDashboard = styled.div`
  .Button {
    background-color: #ef476f;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    z-index: 1000;
    font-family: "Orbitron", sans-serif;
    height: 6vh;
    filter: drop-shadow(0px 3px 2px #303030);
  }
`;

export default PageDashboard;
