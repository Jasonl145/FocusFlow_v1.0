export interface Task { // <- Defining Task interface
    id: number; // Unique identifier for the task
    name: string;
    description: string;
    isImportant: boolean;
    isCompleted: boolean;
    dueDate?: string; // ISO date string
  }