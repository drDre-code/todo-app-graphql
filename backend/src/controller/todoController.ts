import { Request, Response } from 'express';
import Todo from '../model/todoModel';


export const updateTodo = async (id: string, task: string, status: string) => {
  const user = await Todo.findOneAndUpdate({ _id: id }, {
    message: task,
    status: status
  });

  return "Task Updated Successfully";
};

export const createTodo = async (email: string, task: string) => {
  const todo = new Todo({
    email,
    message: task
  });
  const value = await todo.save();
  return "Task Created Successfully";
}

export const deleteTodo = async (id: string) => {
  await Todo.findByIdAndDelete(id)
  return "Task Deleted Successfully";
}

export const errorHandle = (req: Request, res: Response) => {
  res.status(404).send('Invalid Url');
};
