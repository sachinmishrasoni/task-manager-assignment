import express from "express";
import cors from "cors";
import taskRoutes from "./features/tasks/task.routes.js";

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://task-manager-assignment-vert.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.get("/", (_req, res) => {
    res.send("<h2>Hello, Welcome to Task Management Assessment API.</h2>");
});
app.use(express.json());
app.use('/api/tasks', taskRoutes);

export default app;
