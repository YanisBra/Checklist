import styled from "styled-components";
import uniqid from "uniqid";
import Task from "./RedTask";
import PropTypes from "prop-types";
import checklistsData from "../Data/checklistsData";
import { useParams } from "react-router-dom";

const PageList = () => {
  const { id } = useParams();
  const checklist = checklistsData.find((item) => item.id === parseInt(id));

  // Tri des tâches par l'état "done"
  const sortedTasks = [...checklist.tasks].sort((a, b) => a.done - b.done);

  return (
    <>
      <StyledList>
        <h1>{checklist.title}</h1>
        <h2>{checklist.description}</h2>
        {sortedTasks.map(({ task, done }) => (
          <Task key={uniqid()} task={task} done={done} />
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
