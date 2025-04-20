import express, { Request, Response } from "express";

import { 
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../services/taskServices";

const router = express.Router(); // Use only the router here

//Define routes on the router
router.get("/", (_, res): void => { // Get all tasks
  res.json(getAllTasks());
});

router.get("/:id", (req: Request, res: Response): void => { // Get task by ID
  const task = getTaskById(req.params.id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});

router.post("/", (req: Request, res: Response): void => { // Create a new task
  const { name, description, isImportant, dueDate } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: "Missing name or description" });
    return;
  }
    const task = createTask(name, description, isImportant, dueDate);
  res.status(201).json(task);
});

router.put("/:id", (req: Request, res: Response): void => { // Update a task
  const updated = updateTask(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response): void => { // Delete a task
  const success = deleteTask(req.params.id);
  if (!success) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.status(204).send();
});

export default router; // Export the router