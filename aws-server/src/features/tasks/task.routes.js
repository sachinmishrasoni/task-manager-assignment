const express = require("express");
const { addTask, getTasks, deleteTask } = require("./task.controller");

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);

module.exports = router;
