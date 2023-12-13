import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormHeader = ({
  title: initialTitle,
  description: initialDescription,
  onTitleChange,
  onDescriptionChange,
}) => {
  // State for title and description
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  // useEffect to update state when initial values change
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  // Handles title change
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onTitleChange(newValue); // Calls the parent function to update the title in the parent component
  };

  // Handles description change
  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    setDescription(newValue);
    onDescriptionChange(newValue); // Calls the parent function to update the description in the parent component
  };

  return (
    <HeaderContainer>
      <TitleDiv>
        <label htmlFor="title" className="Title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Title..."
          onChange={handleTitleChange}
          required
        />
      </TitleDiv>
      <DescriptionDiv>
        <label htmlFor="description" className="Description">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </DescriptionDiv>
    </HeaderContainer>
  );
};

// Styled Components
const HeaderContainer = styled.div`
  input {
    margin: auto 0;
    padding-left: 5px;
    background-color: var(--lightpink);
    resize: none;
    border: none;
    border-radius: 10px;
    color: white;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: white;
    }
  }

  @media screen and (max-width: 700px) {
    input {
      margin-left: 0px;
      height: 4vh;
    }
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 30px;
  border-radius: 20%;

  .Title {
    font-size: 35px;
    font-weight: 900;
    margin-left: 0;
  }

  @media screen and (max-width: 700px) {
    .Title {
      font-size: 25px;
    }
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 20%;

  .Description {
    font-size: 18px;
  }

  @media screen and (max-width: 700px) {
    .Description {
      font-size: 18px;
    }
  }
`;

// PropTypes
FormHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
};

// Default props
FormHeader.defaultProps = {
  title: "Title...",
  description: "Description...",
};

export default FormHeader;
