import styled from "styled-components";
import uniqid from "uniqid";
import Task from "./RedTask";
import PropTypes from "prop-types";

const tasks = [
  { task: "Task 1", value: false },
  { task: "Task 2", value: false },
  { task: "Task 3", value: false },
  { task: "Task 4", value: false },
  { task: "Task 5", value: false },
  { task: "Task 6", value: true },
  { task: "Task 7", value: true },
];

const PageList = ({ title, description }) => {
  const sortedTasks = [...tasks].sort((a, b) => a.value - b.value);

  return (
    <>
      <StyledList>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {sortedTasks.map((task) => (
          <Task key={uniqid} {...task} />
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
  font-family: "Orbitron", sans-serif;
  color: #ef476f;
  & h1 {
    font-weight: 900;
    font-size: 40px;
  }

  & h2 {
    font-weight: normal;
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
    margin: 20px 100px;
  }
`;

//Props

PageList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

PageList.defaultProps = {
  title: "Checklist 1",
  description: "Description",
};

export default PageList;
