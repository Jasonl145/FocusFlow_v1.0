import { Task } from "../models/Task";
import { v4 as uuidv4 } from "uuid"; 

let tasks: Task[] = []; // In-memory storage for tasks (for Firebase)


export const createTask = (name: string, description: string, isImportant: boolean, dueDate?: string): Task => { 
  const newTask: Task = { // Creating a new task
    id: uuidv4(),
    name,
    description,
    isImportant,
    isCompleted: false,
    dueDate,
  };
  tasks.push(newTask); // Adding the new task to the in-memory storage (firebase edit)
  return newTask;
};


export const updateTask = (id: string, updates: Partial<Omit<Task, "id">>): Task | null => { // Updating a task
  const task = tasks.find((t) => t.id === id); 
  if (!task) return null;
  Object.assign(task, updates); // Merging updates into the existing task
  return task;
};

export const deleteTask = (id: string): boolean => { // Deleting a task
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1); // Removing the task from the in-memory storage (firebase edit)
  return true;
};

export const getTaskById = (id: string): Task | undefined => tasks.find((t) => t.id === id); // Finding a task by ID
export const getAllTasks = (): Task[] => tasks; // Getting all tasks