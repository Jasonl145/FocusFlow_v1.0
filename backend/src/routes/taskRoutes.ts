import express, { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByDate,
  updateTask,
} from "../services/taskServices";

const router = express.Router();

// Get all tasks
router.get("/", async (_, res: Response) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

// Get task by ID
router.get("/:id", async (req: Request, res: Response) => {
  const task = await getTaskById(parseInt(req.params.id, 10));
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});

// Get tasks by date
router.get("/date/:date", async (req: Request, res: Response) => {
  const tasks = await getTasksByDate(req.params.date);
  res.json(tasks);
});

// Create a new task
router.post("/", async (req: Request, res: Response) => {
  const { name, description, isImportant, dueDate } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: "Missing name or description" });
    return;
  }
  const task = await createTask(name, description, isImportant, dueDate);
  res.status(201).json(task);
});

// Update a task
router.put("/:id", async (req: Request, res: Response) => {
  const updated = await updateTask(parseInt(req.params.id, 10), req.body);
  if (!updated) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(updated);
});

// Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
  const success = await deleteTask(parseInt(req.params.id, 10));
  if (!success) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.status(204).send();
});

export default router;