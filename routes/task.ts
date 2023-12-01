import express from 'express';
const router = express.Router();
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task';

router.get('/', (req, res) => {
  res.json({
    message: 'Server is up :)',
    date: new Date()
  });
});

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;