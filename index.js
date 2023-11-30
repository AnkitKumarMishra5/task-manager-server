const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

const Task = mongoose.model('Task', {
  description: String
})

app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is up :)',
    date: new Date() 
  })
})

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json({
      status: 'SUCCESS',
      data: tasks
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.post('/api/tasks', async (req, res) => {
  try {
    const { description } = req.body
    const newTask = await Task.create({ description })
    res.json({
      status: 'SUCCESS',
      data: newTask
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
})

app.patch('/api/tasks/:id', async (req, res) => {
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
})

app.delete('/api/tasks/:id', async (req, res) => {
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
})

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Server is up :)')
  } catch (error) {
    console.error(error)
  }
})