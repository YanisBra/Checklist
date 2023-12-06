import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormHeader = ({
  title: initialTitle,
  description: initialDescription,
  onTitleChange,
  onDescriptionChange,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onTitleChange(newValue); // Appel de la fonction parente pour mettre à jour le titre dans le composant parent
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    setDescription(newValue);
    onDescriptionChange(newValue); // Appel de la fonction parente pour mettre à jour la description dans le composant parent
  };

  return (
    <Header>
      <TitleDiv>
        <label htmlFor="title" className="Title">
          Title :
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder={initialTitle}
          value={title}
          onChange={handleTitleChange}
          required
        />
      </TitleDiv>
      <DescriptionDiv>
        <label htmlFor="description" className="Description">
          Description :
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder={initialDescription}
          value={description}
          onChange={handleDescriptionChange}
        />
      </DescriptionDiv>
    </Header>
  );
};

const Header = styled.div`
  input {
    margin: auto 0 auto 10px;
    background-color: #f78aa2;
    resize: none;
    border: none;
    border-radius: 10px;
    color: white;
    height: 3vh;
    width: 70%;
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
  margin-bottom: 20px;
  margin-top: 30px;
  border-radius: 20%;

  .Title {
    font-size: 35px;
    font-weight: 900;
    margin-left: 0;
  }
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    .Title {
      font-size: 25px;
    }
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-radius: 20%;

  .Description {
    font-size: 18px;
    font-weight: lighter;
  }
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    .Description {
      font-size: 18px;
    }
  }
`;

//propTypes
FormHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
};

FormHeader.defaultProps = {
  title: "Title",
  description: "Description...",
  onTitleChange: () => {},
  onDescriptionChange: () => {},
};

export default FormHeader;
