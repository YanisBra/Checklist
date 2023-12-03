import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NewFormHeader = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  const handleTitleChange = (e) => {
    onTitleChange(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
  };

  return (
    <Header>
      <TitleDiv>
        <label className="Title" htmlFor="title">
          Title :
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
      </TitleDiv>
      <DescriptionDiv>
        <label className="Description" htmlFor="description">
          Description :
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter description"
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
NewFormHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

NewFormHeader.defaultProps = {
  title: "Title",
  description: "Description...",
};

export default NewFormHeader;
