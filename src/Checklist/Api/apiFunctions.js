import api from "./api";

export const addChecklist = async (title, description, todo) => {
  try {
    const response = await api.post("/checklist/add", {
      title,
      description,
      todo,
    });

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
    console.error("Erreur deleting checklist :", error);
    throw error;
  }
};

export const updateChecklist = async (
  checklistId,
  title,
  description,
  todo
) => {
  try {
    const response = await api.post(`/checklist/update?id=${checklistId}`, {
      id: checklistId,
      title,
      description,
      todo,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating checklist:", error);
    throw error;
  }
};

export const updateChecklistStatus = async (checklistId, newStatus) => {
  try {
    const response = await api.get(
      `/checklist/statut?id=${checklistId}&statut=${newStatus}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating checklist status:", error);
    throw error;
  }
};
