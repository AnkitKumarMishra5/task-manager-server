import { Request, Response } from 'express';
import Task from '../models/task';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json({
      status: 'SUCCESS',
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTask = await Task.create({ description });
    res.json({
      status: 'SUCCESS',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { description } = req.body
    await Task.findByIdAndUpdate(id, { description })
    res.json({
      status: 'SUCCESS',
      message: 'Task updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.json({
      status: 'SUCCESS',
      message: 'Task deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
};

