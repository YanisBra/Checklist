import React, { useState } from "react";
import { Card, Button } from "@mantine/core";
import styled from "styled-components";
import AddTask from "../Composants/AddTask";
import { useNavigate } from "react-router-dom";
// import NewFormHeader from "./NewFormHeader";
import FormHeader from "../Composants/FormHeader";
import { addChecklist } from "../Api/apiFunctions";
import WhiteTask from "../Composants/WhiteTask";
// import CheckBox from "./CheckBox";

function FormAddChecklist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);

  const navigate = useNavigate();

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleAddTask = (title) => {
    setTodo((prevTasks) => [...prevTasks, title]);
  };

  const handleDeleteTask = (index) => {
    setTodo((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1); // Supprimez la tâche à l'index spécifié
      return updatedTasks;
    });
  };

  const handleSave = async () => {
    try {
      console.log("Current state before sending:", {
        title,
        description,
        todo,
      });
      // const checklistData = prepareChecklistData(title, description, todo);
      // console.log("ChecklistData to be sent:", checklistData); // Ajoutez cette ligne
      const response = await addChecklist(title, description, todo);
      console.log("Checklist ajoutée avec succès:", response);
      navigate("/"); //Retourner sur le dashboard après avoir save
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
          <FormHeader
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          <div>
            {todo.map((title, index) => (
              <WhiteTask
                key={index}
                title={title}
                onDelete={() => handleDeleteTask(index)}
              />
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
