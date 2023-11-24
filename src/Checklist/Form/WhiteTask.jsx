import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTask = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  padding: 5px;

  .Circle {
    height: 20px;
    margin-right: 15px;
    margin-left: -5px;
  }

  p {
    margin: 0;
    opacity: ${({ value }) => (value ? 0.5 : 1)}; // Opacité conditionnelle
  }
`;

function WhiteTask({ task, value }) {
  const check = value ? "/Images/CheckCircle.svg" : "/Images/WhiteCircle.svg";

  return (
    <StyledTask value={value}>
      <img src={check} alt="Circle" className="Circle" />
      <p>{task}</p>
    </StyledTask>
  );
}

// Props
WhiteTask.propTypes = {
  task: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

WhiteTask.defaultProps = {
  task: "Default Task",
  value: false,
};

export default WhiteTask;
