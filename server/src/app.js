import express from "express";
import cors from "cors";
import taskRoutes from "./features/tasks/task.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/", (_req, res) => {
    res.send("<h2>Hello, Welcome to Task Management Assessment API.</h2>");
});
app.use(express.json());
app.use('/api/tasks', taskRoutes);

export default app;
