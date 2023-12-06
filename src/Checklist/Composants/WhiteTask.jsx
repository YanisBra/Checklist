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
  const [isChecked, setIsChecked] = useState(statut === 2);

  useEffect(() => {
    setIsChecked(statut === 2);
  }, [statut]);

  const toggleCheck = () => {
    const newStatut = isChecked ? 0 : 2;
    setIsChecked(!isChecked);

    onChange && onChange(description, newStatut);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    onUpdateTitle && onUpdateTitle(description, newTitle);
  };

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

// CSS (inchangé)
const StyledTask = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  padding: 5px;

  i {
    margin-left: auto;
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
    opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
  }
`;

// Props (inchangé)
WhiteTask.propTypes = {
  title: PropTypes.string.isRequired,
  statut: PropTypes.number,
  onChange: PropTypes.func,
  description: PropTypes.string,
};

WhiteTask.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default WhiteTask;
