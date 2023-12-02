import api from "./api";

// Fonction pour ajouter une checklist
// export const addChecklist = async (title, description, todo) => {
//   try {
//     const response = await api.post("/checklist/add", {
//       title,
//       description,
//       todo,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding checklist:", error);
//     throw error;
//   }
// };

// // Fonction pour récupérer toutes les checklists
// export const getChecklists = async () => {
//   try {
//     const response = await api.get("/checklists");
//     return response.data;
//   } catch (error) {
//     console.error("Error getting checklists:", error);
//     throw error;
//   }
// };

// Autres fonctions pour d'autres commandes de l'API
// (suppression, mise à jour, etc.)

// Nouvelle fonction pour préparer les données avec les tâches
export const prepareChecklistData = (title, description, tasks) => {
  return {
    title,
    description,
    todo: tasks
      ? tasks.map((task) => ({
          title: task.task,
          description: task.description || "",
        }))
      : [],
  };
};

// Fonction pour ajouter une checklist
export const addChecklist = async (title, description, tasks) => {
  const checklistData = prepareChecklistData(title, description, tasks);

  try {
    const response = await api.post("/checklist/add", checklistData);
    return response.data;
  } catch (error) {
    console.error("Error adding checklist:", error);
    throw error;
  }
};

// Fonction pour récupérer toutes les checklists
export const getChecklists = async () => {
  try {
    const response = await api.get("/checklists");
    return response.data;
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

// Autres fonctions pour d'autres commandes de l'API
// (suppression, mise à jour, etc.)
