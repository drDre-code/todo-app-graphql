import Todo from './model/todoModel';
import User from './model/userModel';
import { updateTodo, createTodo, deleteTodo } from './controller/todoController';
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
    todos: {
      type: new GraphQLList(todoType),
      description: 'The list of tasks to be executed',
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        }
      },
      resolve: (_, args) => Todo.find({ email: args.email })
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Changes you can make',
  fields: () => ({
    updateTask: {
      type: GraphQLString,
      description: 'updates specific todo',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The email of the user',
        },
        task: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        },
        status: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'The email of the user',
        }
      },
      resolve: (_, args, options) => updateTodo(args.id, args.task, args.status)
    },
    createTask: {
      type: GraphQLString,
      description: 'creates a todo',
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        },
        task: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        }
      },
      resolve: (_, args) => createTodo(args.email, args.task)
    },
    deleteTask: {
      type: GraphQLString,
      description: 'creates a todo',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The email of the user',
        }
      },
      resolve: (_, args) => deleteTodo(args.id)
    },

  })
});



const todoSchema = new GraphQLSchema({
  query,
  mutation
});


export = todoSchema;
