import React, { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialState = [];

const taskReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, done: !task.done } : task
      );
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Save tasks to local storage whenever it changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTask };
