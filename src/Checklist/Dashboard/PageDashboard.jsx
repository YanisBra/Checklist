// import React, { useState, useEffect } from "react";
// import CardList from "./CardList";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "@mantine/core";
// import { getChecklists } from "../Api/apiFunctions";

// const PageDashboard = () => {
//   const [checklistsData, setChecklistsData] = useState([]);

//   useEffect(() => {
//     // Chargement des checklists depuis l'API au montage du composant
//     const fetchChecklists = async () => {
//       try {
//         const checklists = await getChecklists();
//         console.log(checklists); // Vérifiez si le tableau est correctement extrait

//         setChecklistsData(checklists);
//       } catch (error) {
//         console.error("Error fetching checklists:", error);
//       }
//     };

//     fetchChecklists();
//   }, []);

//   // Fonction pour mettre à jour localement les checklists après suppression
//   const updateDelete = (deletedChecklistId) => {
//     setChecklistsData((prevChecklists) =>
//       prevChecklists.filter((checklist) => checklist.id !== deletedChecklistId)
//     );
//   };

//   return (
//     <StyledDashboard>
//       <ContainerDiv>
//         {checklistsData.map(({ id, title, description, statut, todo }) => (
//           <CardList
//             key={id}
//             id={id}
//             title={title}
//             description={description}
//             statut={statut}
//             todo={todo}
//             updateDelete={updateDelete} // Passer la fonction de mise à jour à CardList
//           />
//         ))}
//       </ContainerDiv>
//       <Link to="/add-checklist">
//         <Button
//           className="Button"
//           variant="filled"
//           size="md"
//           radius="lg"
//           href="list"
//         >
//           Add Checklist
//         </Button>
//       </Link>
//       <Link to="/add-checklist">
//         <button className="MobileButton">+</button>
//       </Link>
//     </StyledDashboard>
//   );
// };

// const ContainerDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 10vh;
// `;

// const StyledDashboard = styled.div`
//   .Button {
//     background-color: #ef476f;
//     position: fixed;
//     bottom: 2vh;
//     right: 2vh;
//     z-index: 1000;
//     height: 6vh;
//     filter: drop-shadow(0px 3px 2px #303030);
//   }
//   .MobileButton {
//     display: none;
//   }

//   @media screen and (max-width: 700px) {
//     .Button {
//       display: none;
//     }

//     .MobileButton {
//       display: block;
//       background-color: #ef476f;
//       position: fixed;
//       bottom: 2vh;
//       right: 2vh;
//       z-index: 1000;
//       border-radius: 50px;
//       cursor: pointer;
//       color: #ffffff;
//       font-size: 28px;
//       font-weight: bold;
//       /* height: 50px;
//       width: 50px; */
//       height: 2em;
//       width: 2em;
//       border: none;
//       transform: scale(1);
//     }
//   }
// `;

// export default PageDashboard;

import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mantine/core";
import { getChecklists } from "../Api/apiFunctions";

// PageDashboard component
const PageDashboard = () => {
  // State to store checklists data
  const [checklistsData, setChecklistsData] = useState([]);

  // Fetch checklists from the API on component mount
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

  // Rendered JSX
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
            updateDelete={updateDelete} // Pass the update function to CardList
          />
        ))}
      </ContainerDiv>

      {/* Add Checklist Button */}
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

      {/* Mobile Add Checklist Button */}
      <Link to="/add-checklist">
        <button className="MobileButton">+</button>
      </Link>
    </StyledDashboard>
  );
};

// Styled components for PageDashboard
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
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
      height: 2em;
      width: 2em;
      border: none;
      transform: scale(1);
    }
  }
`;

// Export the PageDashboard component
export default PageDashboard;
