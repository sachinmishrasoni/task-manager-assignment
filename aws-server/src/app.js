const express = require("express");
const taskRoutes = require("./features/tasks/task.routes");
const connectDB = require("./config/database");

const app = express();

app.use(express.json({ limit: "1mb" }));
// app.use((req, res, next) => {
//   if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
//     express.json({ limit: "1mb" })(req, res, next);
//   } else {
//     next();
//   }
// });
app.use(express.urlencoded({ extended: true }));

// Connect Mongo
connectDB();

// Routes
app.get("/", (_req, res, next) => {
  return res.status(200).json({
    message: "Hello, Welcome to Task Management Assessment API with AWS.",
  });
});

app.use("/api/tasks", taskRoutes);

// Fallback
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
