import createError, { HttpError } from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';



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

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));



app.listen(3002, () => console.log('running on port 3002'));


export default app;
