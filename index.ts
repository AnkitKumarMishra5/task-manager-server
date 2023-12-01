import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import taskRoutes from './routes/task';

dotenv.config()
const { CORS_ALLOWED_ORIGIN, PORT } = process.env

const app = express()

var corsOptions = {
  origin: CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is up :)',
    date: new Date() 
  })
})

app.listen(PORT, async () => {
  try {
    await connectDB()
    console.log('Server is up :)')
  } catch (error) {
    console.error(error)
  }
})