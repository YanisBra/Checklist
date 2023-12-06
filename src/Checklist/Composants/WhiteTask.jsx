// import styled from "styled-components";
// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

// function WhiteTask({ title, statut, onChange, onDelete }) {
//   const [isChecked, setIsChecked] = useState(false);
//   const [editableTitle, setEditableTitle] = useState(title);

//   useEffect(() => {
//     // Mettez à jour l'état isChecked lorsque statut change
//     setIsChecked(statut === 2);
//   }, [statut]);

//   const toggleCheck = () => {
//     setIsChecked(!isChecked);

//     if (onChange) {
//       onChange(!isChecked);
//     }
//   };

//   const handleTitleChange = (e) => {
//     setEditableTitle(e.target.value);
//   };

//   const check = isChecked
//     ? "/Images/CheckCircle.svg"
//     : "/Images/WhiteCircle.svg";

//   return (
//     <StyledTask statut={statut}>
//       <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
//       <input
//         type="text"
//         value={editableTitle}
//         onChange={handleTitleChange}
//         // onBlur={() => {
//         //   // Vous pouvez ajouter ici la logique pour sauvegarder la tâche modifiée
//         //   // Par exemple, vous pouvez appeler une fonction onChange avec le nouveau titre
//         //   if (onChange) {
//         //     onChange(editableTitle);
//         //   }
//         // }}
//       />
//       <i className="fa-regular fa-trash-can" onClick={onDelete}></i>
//     </StyledTask>
//   );
// }

// // CSS (inchangé)
// const StyledTask = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   border-bottom: 1px solid white;
//   margin-bottom: 10px;
//   padding: 5px;

//   i {
//     margin-left: auto;
//     cursor: pointer;
//   }

//   .Circle {
//     height: 20px;
//     margin-right: 15px;
//     margin-left: -5px;
//   }

//   input {
//     border: none;
//     outline: none;
//     font-size: 16px;
//     background-color: transparent;
//     color: white;
//     margin: 0;
//     opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
//   }
// `;

// // Props (inchangé)
// WhiteTask.propTypes = {
//   title: PropTypes.string.isRequired,
//   statut: PropTypes.number,
//   onChange: PropTypes.func,
// };

// WhiteTask.defaultProps = {
//   title: "Default Task",
//   statut: 0,
// };

// export default WhiteTask;

import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function WhiteTask({ title, statut, onChange, onDelete }) {
  const [isChecked, setIsChecked] = useState(statut === 2);
  const [editableTitle, setEditableTitle] = useState(title);

  useEffect(() => {
    setIsChecked(statut === 2);
  }, [statut]);

  const toggleCheck = () => {
    const newStatut = isChecked ? 0 : 2;
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(editableTitle, newStatut);
    }
  };

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const check = isChecked
    ? "/Images/CheckCircle.svg"
    : "/Images/WhiteCircle.svg";

  return (
    <StyledTask statut={statut}>
      <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
      <input
        type="text"
        value={editableTitle}
        onChange={handleTitleChange}
        onBlur={() => {
          // Mettez à jour le statut avec la dernière valeur isChecked
          if (onChange) {
            onChange(editableTitle, isChecked ? 2 : 0);
          }
        }}
      />
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
  id: PropTypes.string,
};

WhiteTask.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default WhiteTask;
