import Todo from './model/todoModel';
import User from './model/userModel';
import { updateTodo, createTodo, deleteTodo } from './controller/todoController';
import { loginUser, registerUser } from './controller/userController';
import { userType, todoType } from './types';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,

} from 'graphql';







const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    Signin: {
      type: userType,
      description: 'The list of tasks to be executed',
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The password of the user',
        }
      },
      resolve: (_, args) => loginUser(args.email, args.password),
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Changes you can make',
  fields: () => ({
    createUser: {
      type: userType,
      description: 'creates a todo',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The password of the user',
        }
      },
      resolve: (_, args) => registerUser(args.name, args.email, args.password)
    }
  })
});



const userSchema = new GraphQLSchema({
  query,
  mutation
});


export = userSchema;
