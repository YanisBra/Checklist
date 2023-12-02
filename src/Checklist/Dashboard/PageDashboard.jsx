import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import uniqid from "uniqid";
import { Button } from "@mantine/core";
import initialChecklistsData from "../Data/checklistsData";

const PageDashboard = () => {
  const [checklistsData, setChecklists] = useState(initialChecklistsData);

  return (
    <StyledDashboard>
      <ContainerDiv>
        {checklistsData.map(({ id, title, description, nbTask, taskDone }) => (
          <CardList
            key={id}
            id={id}
            title={title}
            description={description}
            nbTask={nbTask}
            taskDone={taskDone}
          />
        ))}
      </ContainerDiv>
      {/* {checklistsData.map(({ title }) => (
        <Link key={uniqid()} to={`/list/${uniqid()}`}>
          <div>
            <p>{title}</p>
          </div>
        </Link>
      ))} */}
      <Link to="/add-checklist">
        <Button
          className="Button"
          variant="filled"
          size="md"
          radius="lg"
          href="list"
        >
          Add Checklist
        </Button>
      </Link>
      <Link to="/add-checklist">
        <button className="MobileButton">+</button>
      </Link>
    </StyledDashboard>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;

  .link {
    text-decoration: none;
  }
`;

const StyledDashboard = styled.div`
  .Button {
    background-color: #ef476f;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    z-index: 1000;
    height: 6vh;
    filter: drop-shadow(0px 3px 2px #303030);
  }
  .MobileButton {
    display: none;
  }

  @media screen and (max-width: 700px) {
    .Button {
      display: none;
    }

    .MobileButton {
      display: block;
      background-color: #ef476f;
      position: fixed;
      bottom: 2vh;
      right: 2vh;
      z-index: 1000;
      border-radius: 50px;
      cursor: pointer;
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
      height: 50px;
      width: 50px;
      border: none;
    }
  }
`;

export default PageDashboard;
