import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function WhiteTask({
  title,
  description,
  statut,
  onChange,
  onDelete,
  onUpdateTitle,
}) {
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

  // Function to handle title changes and call the onUpdateTitle callback
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    onUpdateTitle && onUpdateTitle(description, newTitle);
  };

  // Determine the check icon based on the checked status
  const check = isChecked
    ? "/Images/CheckCircle.svg"
    : "/Images/WhiteCircle.svg";

  return (
    <StyledTask statut={statut}>
      <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
      <input type="text" value={title} onChange={handleTitleChange} />
      <i className="fa-regular fa-trash-can" onClick={onDelete}></i>
    </StyledTask>
  );
}

// Styled components for WhiteTask
const StyledTask = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  padding: 5px;

  i {
    margin-left: auto;
    margin-right: 5px;
    cursor: pointer;
  }

  .Circle {
    height: 20px;
    margin-right: 15px;
    margin-left: -5px;
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    color: white;
    margin: 0;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
  }
`;

// PropTypes for WhiteTask component
WhiteTask.propTypes = {
  title: PropTypes.string.isRequired,
  statut: PropTypes.number,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdateTitle: PropTypes.func,
  description: PropTypes.string,
};

// Default props for WhiteTask component
WhiteTask.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default WhiteTask;
