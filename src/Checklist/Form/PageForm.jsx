import { Card, Button } from "@mantine/core";
import styled from "styled-components";
import uniqid from "uniqid";
import AddTask from "../Composants/AddTask";
import FormHeader from "../Composants/FormHeader";
import CheckBox from "../Composants/CheckBox";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTasksByChecklistId, updateChecklist } from "../Api/apiFunctions";
import WhiteTask from "../Composants/WhiteTask";

function PageForm() {
  const { id } = useParams();
  const [checklist, setChecklist] = useState({
    title: "",
    description: "",
    todo: [],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getTasksByChecklistId(id);
        console.log("API Response:", apiResponse);

        // Mettez à jour l'état en incluant le titre, la description et les tâches
        setChecklist(apiResponse);

        // Mettez à jour l'état des tâches créées localement
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleAddTask = (task) => {
    const newTask = {
      title: task,
      description: uniqid(),
      statut: 0,
    };

    // Mettez à jour la liste todo de l'état checklist en ajoutant la nouvelle tâche
    setChecklist((prevChecklist) => ({
      ...prevChecklist,
      todo: [...prevChecklist.todo, newTask],
    }));
  };

  const handleDeleteTask = (title) => {
    setChecklist((prevChecklist) => {
      const updatedTodo = prevChecklist.todo.filter(
        (task) => task.title !== title
      );
      return {
        ...prevChecklist,
        todo: updatedTodo,
      };
    });
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setChecklist((prevChecklist) => {
      const updatedTodo = prevChecklist.todo.map((task) =>
        task.description === taskId ? { ...task, statut: newStatus } : task
      );

      return {
        ...prevChecklist,
        todo: updatedTodo,
      };
    });
  };

  const handleSave = async () => {
    try {
      console.log("Current state before sending:", {
        title: title !== "" ? title : checklist.title,
        description: description !== "" ? description : checklist.description,
        todo: checklist.todo,
        id: id,
      });

      const response = await updateChecklist(
        id,
        title !== "" ? title : checklist.title,
        description !== "" ? description : checklist.description,
        checklist.todo
      );
      navigate("/"); //Retourner sur le dashboard après avoir save
      console.log("Checklist mise à jour avec succès :", response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la checklist :", error);
    }
  };

  //fonction qui permet de mettre les tasks checks en dessous des autres
  const sortedTasks = [...checklist.todo].sort((a, b) => a.done - b.done);

  return (
    <StyledDiv>
      <Card
        className="Card"
        shadow="sm"
        padding="xl"
        component="div"
        radius="xl"
      >
        <FormHeader
          title={checklist.title}
          description={checklist.description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />
        <div>
          {sortedTasks.map(({ title, statut, description }) => (
            <WhiteTask
              key={description}
              title={title}
              statut={statut}
              id={description} // Passer l'ID de la tâche
              onChange={handleUpdateTaskStatus} // Passer la fonction de mise à jour du statut
              onDelete={() => handleDeleteTask(title)}
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
  );
}

//CSS

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

export default PageForm;
