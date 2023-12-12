import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mantine/core";
import { getChecklists } from "../Api/apiFunctions";

const PageDashboard = () => {
  // State to store checklists data
  const [checklistsData, setChecklistsData] = useState([]);

  // Fetch checklists from the API
  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        // Call the API function to get checklists
        const checklists = await getChecklists();
        console.log(checklists); // Check if the array is extracted correctly

        // Update the state with the fetched checklists
        setChecklistsData(checklists);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      }
    };

    // Invoke the fetchChecklists function
    fetchChecklists();
  }, []);

  // Function to update checklists locally after deletion
  const updateDelete = (deletedChecklistId) => {
    setChecklistsData((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== deletedChecklistId)
    );
  };

  return (
    <StyledDashboard>
      <ContainerDiv>
        {/* Map through checklistsData and render CardList component for each */}
        {checklistsData.map(({ id, title, description, statut, todo }) => (
          <CardList
            key={id}
            id={id}
            title={title}
            description={description}
            statut={statut}
            todo={todo}
            updateDelete={updateDelete}
          />
        ))}
      </ContainerDiv>
      {/*Show "My first Checklist" button only if no existing checklists */}
      {checklistsData.length === 0 && (
        <Link to="/add-checklist">
          <Button className="First" variant="filled" size="md" radius="md">
            Get Started
          </Button>
        </Link>
      )}
      {/* Add Checklist Button */}
      {checklistsData.length >= 1 && (
        <Link to="/add-checklist">
          <Button className="Button" variant="filled" size="md" radius="lg">
            Add Checklist
          </Button>
        </Link>
      )}
      {/* Mobile Add Checklist Button */}
      {checklistsData.length >= 1 && (
        <Link to="/add-checklist">
          <button className="MobileButton">+</button>
        </Link>
      )}
    </StyledDashboard>
  );
};

// Styled components
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;

  @media screen and (max-height: 700px) {
    margin-top: 75px;
  }
`;

const StyledDashboard = styled.div`
  .First {
    background-color: var(--pink);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    height: 6vh;
    filter: drop-shadow(0px 3px 2px #303030);
    min-height: 50px;
  }

  .Button {
    background-color: #ef476f;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    z-index: 1000;
    height: 6vh;
    filter: drop-shadow(0px 3px 2px #303030);
    min-height: 50px;
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
      height: 2em;
      width: 2em;
      border: none;
      transform: scale(1);
    }
  }
`;

export default PageDashboard;
