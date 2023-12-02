import { Card, Button, Checkbox } from "@mantine/core";
import styled from "styled-components";
import uniqid from "uniqid";
import AddTask from "./AddTask";
import FormHeader from "./FormHeader";
import CheckBox from "./CheckBox";
import checklistsData from "../Data/checklistsData";
import { useParams } from "react-router-dom";

//fonction qui permet de mettre les tasks checks en dessous des autres
function PageForm() {
  const { id } = useParams();
  const checklist = checklistsData.find((item) => item.id === parseInt(id));
  const sortedTasks = [...checklist.tasks].sort((a, b) => a.done - b.done);

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
          <FormHeader
            title={checklist.title}
            description={checklist.description}
          />
          <div>
            {/* {sortedTasks.map((task) => (
              <CheckBox key={uniqid} {...task} />
            ))} */}
            {sortedTasks.map(({ task, done }) => (
              <CheckBox key={uniqid()} task={task} done={done} />
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
