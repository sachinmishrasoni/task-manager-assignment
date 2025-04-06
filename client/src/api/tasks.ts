import axios from 'axios';
import { AddTaskResponse, GetTasksResponse, Task } from '../types/task';

// Set base API URL from environment or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL ;
const TASKS_URL = `${API_URL}/tasks`;


// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<GetTasksResponse>(TASKS_URL);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (title: string): Promise<Task> => {
  try {
    const response = await axios.post<AddTaskResponse>(TASKS_URL, { title });
    return response.data?.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${TASKS_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};
