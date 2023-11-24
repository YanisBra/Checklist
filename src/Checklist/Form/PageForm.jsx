import { Card, Button } from "@mantine/core";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import uniqid from "uniqid";

const tasks = [
  { task: "Task 1", value: false },
  { task: "Task 2", value: false },
  { task: "Task 3", value: false },
  { task: "Task 4", value: false },
  { task: "Task 5", value: false },
  { task: "Task 6", value: true },
  { task: "Task 7", value: true },
];

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
          <Header>
            <TitleDiv>
              {/* <h1 className="Title">Title :</h1>
            <textarea className="texttitle"></textarea> */}
              <label className="Title" htmlFor="titre">
                Title :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="New title..."
              />
            </TitleDiv>
            <DescriptionDiv>
              {/* <h2 className="Description">Description :</h2>
            <textarea className="texttitle"></textarea> */}
              <label className="Description" htmlFor="description">
                Description :
              </label>
              <input
                type="text"
                id="desciption"
                name="description"
                placeholder="Description..."
              />
            </DescriptionDiv>
          </Header>
          <div>
            {sortedTasks.map((task) => (
              <CheckBox key={uniqid} {...task} />
            ))}
          </div>
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
  font-family: "Orbitron", sans-serif;
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

  textarea {
    margin: auto 0 auto auto;
    width: 70%;
    background-color: #f78aa2;
    resize: none;
    border: none;
    border-radius: 10px;
    color: white;
  }
`;

const Header = styled.div`
  input {
    margin: auto 0 auto 10px;
    background-color: #f78aa2;
    resize: none;
    border: none;
    border-radius: 10px;
    color: white;

    &::placeholder {
      color: white;
    }
  }
`;

const TitleDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 30px;
  border-radius: 20%;

  .Title {
    font-size: 35px;
    font-weight: 900;
    margin-left: 0;
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-radius: 20%;

  .Description {
    font-size: 18px;
    font-weight: lighter;
  }
`;

export default PageForm;
