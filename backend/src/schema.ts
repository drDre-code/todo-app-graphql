import Todo from './model/todoModel';
import { loginUser, registerUser } from './controller/userController';
import { updateTodo, createTodo, deleteTodo } from './controller/todoController';
import { userType, todoType } from './types';
import { isAuth } from './utils';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';






const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    signin: {
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
      resolve: (_, args) => loginUser(args.email, args.password)
    },
    todos: {
      type: todoType,
      description: 'The list of tasks to be executed',
      resolve: (_, _args, next) => {
        const user = isAuth(next) as unknown as { [key: string]: string; };
        if (user.message) {
          return user.message;
        }
        return {
          name: user.name,
          todos: Todo.find({ email: user.email }).sort({status: 1})
        };
      }
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
    },
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
          description: 'The task to update with',
        },
        status: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'The email of the user',
        }
      },
      resolve: (_, args, next) => {

        const user = isAuth(next) as unknown as { [key: string]: string; };
        if (user.message) {
          return user.message;
        }
        return updateTodo(args.id, args.task, args.status, user.email);
      }
    },
    createTask: {
      type: GraphQLString,
      description: 'creates a todo',
      args: {
        task: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user',
        }
      },
      resolve: (_, args, next) => {
        const user = isAuth(next) as unknown as { [key: string]: string; };
        if (user.message) {
          return user.message;
        }
        return createTodo(user.email, args.task);
      }
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
      resolve: (_, args, next) => {
        const user = isAuth(next) as unknown as { [key: string]: string; };
        if (user.message) {
          return user.message;
        }
        return deleteTodo(user.email, args.id);
      }
    },

  })
});



const todoSchema = new GraphQLSchema({
  query,
  mutation
});


export = todoSchema;
