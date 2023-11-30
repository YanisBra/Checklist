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
    cursor: pointer; /* Ajouter une propriété de curseur pour indiquer que c'est cliquable */
  }

  p {
    margin: 0;
    opacity: ${({ done }) => (done ? 0.5 : 1)};
  }
`;

function RedTask({ task, done, onChange }) {
  const [isChecked, setIsChecked] = useState(done);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    // Appeler la fonction onChange pour mettre à jour la valeur à l'extérieur
    if (onChange) {
      onChange(!isChecked);
    }
  };

  const check = isChecked ? "/Images/CheckCircle.svg" : "/Images/Circle.svg";

  return (
    <StyledTask done={isChecked}>
      <img
        src={check}
        alt="Circle"
        className="Circle"
        onClick={toggleCheck} // Ajouter l'événement onClick pour changer la valeur
      />
      <p>{task}</p>
    </StyledTask>
  );
}

// Props
RedTask.propTypes = {
  task: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onChange: PropTypes.func, // Ajouter la prop onChange
};

RedTask.defaultProps = {
  task: "Default Task",
  done: false,
};

export default RedTask;
