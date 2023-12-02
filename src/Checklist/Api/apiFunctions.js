import api from "./api";

// Fonction pour ajouter une checklist
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
    return response.data;
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

// Autres fonctions pour d'autres commandes de l'API
// (suppression, mise à jour, etc.)
