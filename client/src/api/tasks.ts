import axios from 'axios';
import { Task } from '../types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

// export const getTasks = async (): Promise<Task[]> => {
//     const res = await axios.get<Task[]>(API_URL);
//     return res.data;
// };

export const getTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

export const addTask = async (title: string): Promise<Task> => {
    const res = await axios.post<Task>(API_URL, { title });
    return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
