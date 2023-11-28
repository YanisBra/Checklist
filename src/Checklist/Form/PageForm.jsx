import { Card, Button, Checkbox } from "@mantine/core";
import styled from "styled-components";
import uniqid from "uniqid";
import AddTask from "./AddTask";
import FormHeader from "./FormHeader";
import CheckBox from "./CheckBox";

const tasks = [
  { task: "Task 1", value: false },
  { task: "Task 2", value: false },
  { task: "Task 3", value: false },
  { task: "Task 4", value: false },
  { task: "Task 5", value: false },
  { task: "Task 6", value: true },
  { task: "Task 7", value: true },
];

//fonction qui permet de mettre les tasks checks en dessous des autres
function PageForm() {
  const sortedTasks = [...tasks].sort((a, b) => a.value - b.value);

  return (
    <>
      <StyledDiv>
        <Card
          className="Card"
          shadow="sm"
          padding="xl"
          component="div"
          radius="xl"
        >
          <FormHeader />
          <div>
            {sortedTasks.map((task) => (
              <CheckBox key={uniqid} {...task} />
            ))}
          </div>
          <AddTask />
          <Button
            className="Button"
            variant="outline"
            color="rgba(255, 255, 255, 1)"
            size="md"
            radius="xl"
          >
            Save
          </Button>
        </Card>
      </StyledDiv>
    </>
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

export default PageForm;
