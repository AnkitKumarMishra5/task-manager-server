import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  description: string;
}

const taskSchema = new Schema<ITask>({
  description: { type: String, required: true },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
