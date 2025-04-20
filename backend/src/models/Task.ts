export interface Task { // <- Defining Task interface
    id: string;
    name: string;
    description: string;
    isImportant: boolean;
    isCompleted: boolean;
    dueDate?: string; // ISO date string
  }