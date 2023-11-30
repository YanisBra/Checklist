import React from "react";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const StyledNavbar = styled(Navbar)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #26547c;
  height: 10vh;

  a {
    display: flex;
    font-size: 30px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 20px;
    font-family: "Orbitron", sans-serif;
  }

  .Home {
    margin-left: 3vw;
    background-color: #ef476f;
    margin-right: auto;
    width: 15vh;
    filter: drop-shadow(0px 3px 2px #303030);
  }

  .Entreprise {
    display: flex;
    align-items: center;
  }

  .Logo {
    margin-right: -25px;
    height: 80px;
    width: 140px;
  }

  @media screen and (max-width: 700px) {
    a {
      font-size: 20px;
      text-align: center;
    }
    .Logo {
      height: 60px;
      width: 105px;
    }
    .Home {
      width: 15vh;
      font-size: 17px;
    }
  }

  @media screen and (max-width: 500px) {
    a {
      font-size: 20px;
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      width: 150px;
    }
    .Logo {
      height: 60px;
      width: 105px;
    }
    .Home {
      width: 15vh;
      font-size: 17px;
    }
  }
`;

const Navbar2 = () => {
  return (
    <StyledNavbar>
      <Button
        className="Home"
        radius="lg"
        variant="filled"
        size="xl"
        href="youtube.com"
      >
        Home
      </Button>

      <div className="Entreprise">
        <img src="./Images/Logo.png" alt="Logo" className="Logo" />
        <a href="/" className="Pre-flight-checklist">
          Pre-flight checklist
        </a>
      </div>
    </StyledNavbar>
  );
};

export default Navbar2;
