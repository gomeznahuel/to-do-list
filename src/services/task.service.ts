import { TaskDTO } from "../dto/task.dto";
import { taskModel } from "../models";

const getAllTasks = async (): Promise<TaskDTO[]> => {
  try {
    const tasksList = await taskModel.find();
    return tasksList;
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
};

const findOneTask = async (title: string) => {
  try {
    const findTask = await taskModel.findOne({ title })
    return findTask
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
}

const getTaskById = async (id: string) => {
  try {
    const task = await taskModel.findById(id)
    return task
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
}

const createTask = async ({ title, description, status}: { title: string; description: string; status: boolean }) => {
  try {
    const newTask = await taskModel.create({ title, description, status });
    return newTask;
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
};

const updateTask = async (uid: string, { title, description, status}: { title: string; description: string; status: boolean }) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(uid, {title, description, status})
    return updatedTask
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
}

const deleteTask = async (id: string) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id)
    return deletedTask
  } catch (error) {
    throw new Error(("Error fetching tasks: " + error) as string);
  }
}

export { createTask, deleteTask, findOneTask, getAllTasks, getTaskById, updateTask };