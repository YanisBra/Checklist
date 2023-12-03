import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

const StyledTask = styled.div`
  display: flex;
  width: 70vw;
  align-items: center;
  border-bottom: 2px solid #ef476f;
  margin-bottom: 10px;
  padding: 5px;

  .Circle {
    height: 25px;
    margin-right: 15px;
    margin-left: -5px;
    cursor: pointer;
  }

  p {
    margin: 0;
    opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
  }
`;

function RedTask({ task, statut, onChange }) {
  const [isChecked, setIsChecked] = useState(statut === 2);

  const toggleCheck = () => {
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(!isChecked);
    }
  };

  const check = isChecked ? "/Images/CheckCircle.svg" : "/Images/Circle.svg";

  return (
    <StyledTask statut={isChecked ? 2 : 0}>
      <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
      <p>{task}</p>
    </StyledTask>
  );
}

RedTask.propTypes = {
  task: PropTypes.string.isRequired,
  statut: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

RedTask.defaultProps = {
  task: "Default Task",
  statut: 0,
};

export default RedTask;
