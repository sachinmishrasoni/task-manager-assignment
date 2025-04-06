import Task from './task.model.js';

export const getTasks = async (_req, res) => {
    const tasks = await Task.find();
    if (!tasks) {
        return res.status(404).json({ message: 'Tasks not found' });
    }
    res.json({
        message: 'Tasks retrieved successfully',
        data: tasks
    });
};

export const addTask = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = new Task({ title });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', data: task });
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully', data: task.id });
};

