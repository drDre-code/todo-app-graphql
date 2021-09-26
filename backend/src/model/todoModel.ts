import mongoose, { Schema } from 'mongoose';



const todoSchema = new Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

export = Todo;
