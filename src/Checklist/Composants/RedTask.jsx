// import styled from "styled-components";
// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

// function RedTask({ title, description, statut, onChange }) {
//   const [isChecked, setIsChecked] = useState(statut === 2);

//   useEffect(() => {
//     setIsChecked(statut === 2);
//   }, [statut]);

//   const toggleCheck = () => {
//     const newStatut = isChecked ? 0 : 2;
//     setIsChecked(!isChecked);

//     onChange && onChange(description, newStatut);
//   };

//   const check = isChecked ? "/Images/CheckCircle.svg" : "/Images/Circle.svg";

//   return (
//     <StyledTask statut={isChecked ? 2 : 0}>
//       <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
//       <p>{title}</p>
//     </StyledTask>
//   );
// }

// //CSS
// const StyledTask = styled.div`
//   display: flex;
//   width: 70vw;
//   align-items: center;
//   border-bottom: 2px solid #ef476f;
//   margin-bottom: 10px;
//   padding: 5px;

//   .Circle {
//     height: 25px;
//     margin-right: 15px;
//     margin-left: -5px;
//     cursor: pointer;
//   }

//   p {
//     margin: 0;
//     opacity: ${({ statut }) => (statut === 2 ? 0.5 : 1)};
//     width: 65vw;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
// `;

// //propTypes
// RedTask.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   statut: PropTypes.number.isRequired,
//   onChange: PropTypes.func,
// };

// RedTask.defaultProps = {
//   title: "Default Task",
//   statut: 0,
// };

// export default RedTask;

import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// RedTask component
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

  // Rendered JSX
  return (
    <StyledTask statut={isChecked ? 2 : 0}>
      <img src={check} alt="Circle" className="Circle" onClick={toggleCheck} />
      <p>{title}</p>
    </StyledTask>
  );
}

// Styled components for RedTask
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
    width: 65vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// PropTypes for RedTask component
RedTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  statut: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

// Default props for RedTask component
RedTask.defaultProps = {
  title: "Default Task",
  statut: 0,
};

export default RedTask;
