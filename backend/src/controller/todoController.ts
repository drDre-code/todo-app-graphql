import { Request, Response } from 'express';
import Todo from '../model/todoModel';


export const updateTodo = async (id: string, task: string, status: string, email: string) => {
  const todo = await Todo.findById(id);
  if (todo.email !== email) {
    return 'Unauthorized access';
  }
  todo.message = todo.message || task;
  todo.status = status;
  const data = await todo.save();
  return "Task Updated Successfully";
};

export const createTodo = async (email: string, task: string) => {
  const todo = new Todo({
    email,
    message: task
  });
  const value = await todo.save();
  return "Task Created Successfully";
};

export const deleteTodo = async (email: string, id: string) => {
  const todo = await Todo.findById(id);
  if (todo.email !== email) {
    return 'Unauthorized access';
  }
  await todo.remove();
  return "Task Deleted Successfully";
};

