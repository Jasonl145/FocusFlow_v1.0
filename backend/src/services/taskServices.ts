import pool from "../db";
import { Task } from "../models/Task";

// Create a new task
export const createTask = async (
  name: string,
  description: string,
  isImportant: boolean,
  dueDate?: string
): Promise<Task> => {
  const result = await pool.query(
    `INSERT INTO tasks (name, description, is_important, due_date) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, isImportant, dueDate]
  );
  return result.rows[0];
};

// Get all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

// Get tasks by ID
export const getTaskById = async (id: number): Promise<Task | null> => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Get tasks by date
export const getTasksByDate = async (date: string): Promise<Task[]> => {
  const result = await pool.query("SELECT * FROM tasks WHERE due_date = $1", [date]);
  return result.rows;
};

// Update a task
export const updateTask = async (
  id: number,
  updates: Partial<Omit<Task, "id">>
): Promise<Task | null> => {
  const fields = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(", ");
  const values = Object.values(updates);
  const result = await pool.query(
    `UPDATE tasks SET ${fields} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0] || null;
};

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rowCount !== null && result.rowCount > 0;
};