import express from 'express';
import Todo from '../model/todoModel';
import { isAuth } from '../utils';

const router = express.Router();

/* GET home page. */
router.post('/mine', isAuth, async (req: express.Request, res) => {
  console.log('dre', req.body);

  try {
    if (req.user) {
      // console.log('dreyy');
      const todo = new Todo({
        email: req.user.email,
        message: req.body.todo
      });

      const value = await todo.save();
      // console.log(value);
      res.send(value);
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.delete('/mine/:id', isAuth, async (req: express.Request, res) => {

  try {
    if (req.user) {
      const todo = await Todo.findById(req.params.id);
      if (todo) {
        const value = await todo.remove();
        res.send(value);
      }
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.put('/mine/:id', isAuth, async (req: express.Request, res) => {

  try {
    if (req.user) {
      const todo = await Todo.findById(req.params.id);
      if (todo) {
        // console.log(todo, "3");
        todo.email = todo.email;
        todo.message = req.body.input || todo.message;
        todo.status = req.body.status;

        const value = await todo.save();
        console.log(value);
        res.send(value);

      }
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.get('/mine', isAuth, async (req: express.Request, res,) => {
  try {
    if (req.user) {
      console.log(req.user);
      const todos = await Todo.find({ email: req.user.email }).sort({ status: false });
      res.cookie('token', req.user.token);
      res.send({ name: req.user.name, todos });

    }
  } catch (err) {
    if (req.user) {
      res.send({ name: req.user.name });
    }
  }
});

export = router;
