import api from "./api";

// Function to add a new checklists
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

// Function to get all checklists
export const getChecklists = async () => {
  try {
    const response = await api.get("/checklists");
    return response.data.response;
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

// Function to get checklist by ID
export const getChecklistById = async (checklistId) => {
  try {
    const response = await api.get(`/checklist?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Function to delete checklist
export const deleteChecklist = async (checklistId) => {
  try {
    const response = await api.get(`/checklist/delete?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting checklist:", error);
    throw error;
  }
};

// Function to update a checklists
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

// Function to update the checklist status
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
