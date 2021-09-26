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

export const userType = new GraphQLObjectType({
  name: 'user',
  description: 'user Information',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The user's unique id",
      resolve: (source) => source._id
    },
    name: {
      type: GraphQLString,
      description: "The user's name",
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user',
    },
    message: {
      type: GraphQLString,
      description: 'Error message if any',
    },
    token: {
      type: GraphQLString,
      description: "The user's login token",
    },

  })
});

export const todoType = new GraphQLObjectType({
  name: 'todo',
  description: 'todo Information',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The task's unique id",
      resolve: (source) => source._id
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user',
    },
    task: {
      type: GraphQLString,
      description: "The task to be done",
      resolve: (source) => source.message
    },
    status: {
      type: GraphQLBoolean,
      description: "The status of the task",
    }
  })
});
