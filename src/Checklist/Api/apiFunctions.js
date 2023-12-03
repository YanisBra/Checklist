import api from "./api";

export const prepareChecklistData = (title, description, tasks) => {
  return {
    title,
    description,
    todo: tasks
      ? tasks.map((task) => ({
          title: task || "", // Ajoutez une propriété title
          description: description || "",
          statut: statut || 0,
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
    return response.data.response; // Extraire la propriété response
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

// Fonction pour récupérer les tâches par ID de checklist
export const getTasksByChecklistId = async (checklistId) => {
  try {
    const response = await api.get(`/checklist?id=${checklistId}`);
    return response.data; // Assurez-vous d'ajuster la structure de la réponse selon votre API
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Fonction pour supprimer
export const deleteChecklist = async (checklistId) => {
  try {
    const response = await api.get(`/checklist/delete?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la checklist :", error);
    throw error;
  }
};

// Autres fonctions pour d'autres commandes de l'API
// (suppression, mise à jour, etc.)
