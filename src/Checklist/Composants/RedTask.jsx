import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function RedTask({ title, description, statut, onChange }) {
  // State to track the checked status
  const [isChecked, setIsChecked] = useState(statut === 2);

  // Effect to update the checked status when statut changes
  useEffect(() => {
    setIsChecked(statut === 2);
  }, [statut]);

  // Function to toggle the checked status and call the onChange callback
  const toggleCheck = () => {
    const newStatut = isChecked ? 0 : 2;
    setIsChecked(!isChecked);

    onChange && onChange(description, newStatut);
  };

  // Determine the check icon based on the checked status
  const check = isChecked ? "/Images/CheckCircle.svg" : "/Images/Circle.svg";

  return (
    <StyledTask onClick={toggleCheck} statut={isChecked ? 2 : 0}>
      <img src={check} alt="Circle" className="Circle" />
      <p>{title}</p>
    </StyledTask>
  );
}

// Styled components
const StyledTask = styled.div`
  display: flex;
  width: 70vw;
  align-items: center;
  border-bottom: 2px solid var(--pink);
  margin-bottom: 10px;
  padding: 5px;
  user-select: none;
  cursor: pointer;

  .Circle {
    height: 25px;
    margin-right: 15px;
    margin-left: -5px;
    cursor: pointer;
  }

  p {
    margin: 0;
    opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
    width: 65vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// PropTypes
RedTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  statut: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

// Default props
RedTask.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default RedTask;
