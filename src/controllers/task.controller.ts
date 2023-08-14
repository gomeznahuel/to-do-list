import { Request, Response } from "express";
import { createTask, deleteTask, findOneTask, getAllTasks, getTaskById, updateTask } from "../services/task.service";
import { handleErrorMessage } from "../utils";

const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();

    if (tasks.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(tasks);
  } catch (error) {
    handleErrorMessage("fetching tasks", error as Error);
    return res.status(500).json({ error: "An error occurred while fetching tasks." });
  }
};

const getTaskByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getTask = await getTaskById(id);

    if (!getTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(getTask);
  } catch (error) {
    handleErrorMessage("fetching task by ID", error as Error);
    return res.status(500).json({ error: "An error occurred while fetching the task." });
  }
};


const createTaskController = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;  
  const newObject = { title, description, status };

  if (await findOneTask(title)) {
    return res.status(400).json({ error: "Task already exists" });
  }

  try {
    const createdTask = await createTask(newObject);
    return res.status(201).json(createdTask);
  } catch (error) {
    handleErrorMessage("creating task", error as Error);
  }
};

const updateTaskController = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const { id } = req.params

  try {    
    const existingTask = await getTaskById(id);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await updateTask(id, { title, description, status });
    return res.status(200).json(updatedTask);
  } catch (error) {
    handleErrorMessage("updating task", error as Error);
  }
}

const deleteTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingTask = await getTaskById(id);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = await deleteTask(id);
    return res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    handleErrorMessage("deleting task", error as Error);
    return res.status(500).json({ error: "An error occurred while deleting the task." });
  }
};


export { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController, updateTaskController };