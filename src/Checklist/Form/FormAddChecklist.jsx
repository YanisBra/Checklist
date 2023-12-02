// import React from "react";
// import { Card, Button } from "@mantine/core";
// import styled from "styled-components";
// import AddTask from "./AddTask";
// import FormHeader from "./FormHeader";

// function FormAddChecklist() {
//   return (
//     <>
//       <StyledDiv>
//         <Card
//           className="Card"
//           shadow="sm"
//           padding="xl"
//           component="div"
//           radius="xl"
//         >
//           <FormHeader />
//           <div>
//             {/* Composant pour ajouter des tâches */}
//             <AddTask />
//           </div>
//           <Button
//             className="Button"
//             variant="outline"
//             color="rgba(255, 255, 255, 1)"
//             size="md"
//             radius="xl"
//             // Action pour sauvegarder la checklist (à ajouter)
//           >
//             Save
//           </Button>
//         </Card>
//       </StyledDiv>
//     </>
//   );
// }

// // CSS (inchangé)
// const StyledDiv = styled.div`
//   width: 50vw;
//   height: 70;
//   margin: 5vh auto;
//   filter: drop-shadow(0px 5px 2px #878787);
//   margin-top: 15vh;
//   .Card {
//     background-color: #ef476f;
//     color: white;
//     padding: 0px 16px 16px 16px;
//   }
//   .Edit {
//     height: 25px;
//   }

//   .Edit,
//   .Poubelle {
//     height: 20px;
//     position: fixed;
//     right: 2vh;
//   }

//   .Edit {
//     top: 4vw;
//   }

//   .Poubelle {
//     top: 10vw;
//   }

//   .Button {
//     width: 40%;
//     margin: auto;
//   }

//   @media screen and (max-width: 700px) {
//     width: 80vw;
//   }
// `;

// export default FormAddChecklist;

// import React, { useState } from "react";
// import { Card, Button } from "@mantine/core";
// import styled from "styled-components";
// import AddTask from "./AddTask";
// import NewFormHeader from "./NewFormHeader";
// import CheckBox from "./CheckBox";
// import { addChecklist } from "../Api/apiFunctions";

// function FormAddChecklist() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const handleTitleChange = (value) => {
//     setTitle(value);
//   };

//   const handleDescriptionChange = (value) => {
//     setDescription(value);
//   };

//   const handleAddTask = (task) => {
//     setTasks((prevTasks) => [...prevTasks, task]);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await addChecklist(title, description, tasks);
//       console.log("Checklist ajoutée avec succès:", response);
//       // Ajoutez ici des actions supplémentaires si nécessaire
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la checklist:", error);
//       // Ajoutez ici des actions supplémentaires en cas d'erreur
//     }
//   };

//   return (
//     <>
//       <StyledDiv>
//         <Card
//           className="Card"
//           shadow="sm"
//           padding="xl"
//           component="div"
//           radius="xl"
//         >
//           <NewFormHeader
//             title={title}
//             description={description}
//             onTitleChange={handleTitleChange}
//             onDescriptionChange={handleDescriptionChange}
//           />
//           <div>
//             {tasks.map((task, index) => (
//               <CheckBox key={index} task={task} done={false} />
//             ))}
//           </div>
//           <div>
//             <AddTask onAddTask={handleAddTask} />
//           </div>
//           <Button
//             className="Button"
//             variant="outline"
//             color="rgba(255, 255, 255, 1)"
//             size="md"
//             radius="xl"
//             onClick={handleSave}
//           >
//             Save
//           </Button>
//         </Card>
//       </StyledDiv>
//     </>
//   );
// }

// // CSS (inchangé)
// const StyledDiv = styled.div`
//   width: 50vw;
//   height: 70;
//   margin: 5vh auto;
//   filter: drop-shadow(0px 5px 2px #878787);
//   margin-top: 15vh;
//   .Card {
//     background-color: #ef476f;
//     color: white;
//     padding: 0px 16px 16px 16px;
//   }
//   .Edit {
//     height: 25px;
//   }

//   .Edit,
//   .Poubelle {
//     height: 20px;
//     position: fixed;
//     right: 2vh;
//   }

//   .Edit {
//     top: 4vw;
//   }

//   .Poubelle {
//     top: 10vw;
//   }

//   .Button {
//     width: 40%;
//     margin: auto;
//   }

//   @media screen and (max-width: 700px) {
//     width: 80vw;
//   }
// `;

// export default FormAddChecklist;

import React, { useState } from "react";
import { Card, Button } from "@mantine/core";
import styled from "styled-components";
import AddTask from "./AddTask";
import NewFormHeader from "./NewFormHeader";
import CheckBox from "./CheckBox"; // Assurez-vous d'importer CheckBox
import { addChecklist, prepareChecklistData } from "../Api/apiFunctions";

function FormAddChecklist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleSave = async () => {
    try {
      const checklistData = prepareChecklistData(title, description, tasks);
      const response = await addChecklist(
        checklistData.title,
        checklistData.description,
        checklistData.todo
      );
      console.log("Checklist ajoutée avec succès:", response);
      // Ajoutez ici des actions supplémentaires si nécessaire
    } catch (error) {
      console.error("Erreur lors de l'ajout de la checklist:", error);
      // Ajoutez ici des actions supplémentaires en cas d'erreur
    }
  };

  return (
    <>
      <StyledDiv>
        <Card
          className="Card"
          shadow="sm"
          padding="xl"
          component="div"
          radius="xl"
        >
          <NewFormHeader
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          <div>
            {tasks.map((task, index) => (
              <CheckBox key={index} task={task} done={false} />
            ))}
          </div>
          <div>
            <AddTask onAddTask={handleAddTask} />
          </div>

          <Button
            className="Button"
            variant="outline"
            color="rgba(255, 255, 255, 1)"
            size="md"
            radius="xl"
            onClick={handleSave}
          >
            Save
          </Button>
        </Card>
      </StyledDiv>
    </>
  );
}

// CSS (inchangé)
const StyledDiv = styled.div`
  width: 50vw;
  height: 70;
  margin: 5vh auto;
  filter: drop-shadow(0px 5px 2px #878787);
  margin-top: 15vh;
  .Card {
    background-color: #ef476f;
    color: white;
    padding: 0px 16px 16px 16px;
  }
  .Edit {
    height: 25px;
  }

  .Edit,
  .Poubelle {
    height: 20px;
    position: fixed;
    right: 2vh;
  }

  .Edit {
    top: 4vw;
  }

  .Poubelle {
    top: 10vw;
  }

  .Button {
    width: 40%;
    margin: auto;
  }

  @media screen and (max-width: 700px) {
    width: 80vw;
  }
`;

export default FormAddChecklist;
