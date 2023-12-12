import styled from "styled-components";
import PropTypes from "prop-types";

//WhiteTask component without checkbox
function WhiteTask2({ title, description, onDelete, onUpdateTitle }) {
  // Function to handle title changes and call the onUpdateTitle callback
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    onUpdateTitle && onUpdateTitle(description, newTitle);
  };

  return (
    <StyledTask>
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
  }
`;

// PropTypes for WhiteTask component
WhiteTask2.propTypes = {
  title: PropTypes.string.isRequired,
};

// Default props for WhiteTask component
WhiteTask2.defaultProps = {
  title: "Default Task",
};

export default WhiteTask2;
