import express from 'express';
import Todo from '../model/todoModel';
import jwt from 'jsonwebtoken';

const indexRouter = express.Router();

let signinError: null | string = null;

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

indexRouter.get('/registration', (req, res) => {
  res.render('registration', {
    title: 'Express',
    error: null
  });
});

indexRouter.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'Express',
    error: signinError
  });
});

indexRouter.get('/todos', async (req, res) => {
  if (!req.cookies.token) return res.redirect('/');
  try {

    jwt.verify(req.cookies.token, process.env.JWT_SECRET || 'takeaguess', async (err: jwt.VerifyErrors | null, decode: any) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        let todos = await Todo.find({
          email: decode.email
        }).sort({ status: false });
        // if (!todos) {
        //   todos = []
        // }
        res.render('todos', {
          title: 'Express',
          name: decode.name,
          todos,
          error: null
        });

      }
    });


    // res.cookie('token', req.user.token);
    // res.send({ name: req.user.name, todos });
    // }
  } catch (err) {
    // if (req.user) {
    //   res.send({ name: req.user.name });
    // }
  }


});


export default indexRouter;
