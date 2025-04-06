import express from 'express';
import { getTasks, addTask, deleteTask } from './task.controller.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);

export default router;
