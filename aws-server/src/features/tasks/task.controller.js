const { ObjectId } = require("mongodb");
const connectDB = require("../../config/database");

const getTasks = async (_req, res) => {
  try {
    const db = await connectDB();
    const tasks = await db.collection("tasks").find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const addTask = async (req, res) => {
  try {
    const db = await connectDB();
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const now = new Date();
    const newTask = {
      title,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("tasks").insertOne(newTask);

    const createdTask = {
      _id: result.insertedId,
      ...newTask,
    };

    res.status(201).json({ message: "Task added", data: createdTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = { getTasks, addTask, deleteTask };
