import createError, { HttpError } from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index';
import userRouter from './routes/users';
import indexRouter from './routes/display';
import { graphqlHTTP } from 'express-graphql';
import todoSchema from './todoSchema';
import userSchema from './userSchema';
import { isAuth } from './utils';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('Database Connected')).catch((error) => console.log(error));


const app = express();



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/users', graphqlHTTP({
  schema: userSchema,
  graphiql: true
}));

app.use('/todos', isAuth, graphqlHTTP({
  schema: todoSchema,
  graphiql: true
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3002, () => console.log('running on port 3002'));


export default app;
