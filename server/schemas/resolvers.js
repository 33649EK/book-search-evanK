// const { User } = require('../models');
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../controllers/user-controller');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      }
      // Call the getSingleUser function from your controller
      return getSingleUser(context.user._id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      // Call the createUser function from your controller
      return createUser(args);
    },
    saveBook: async (_, { input }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      }
      // Call the saveBook function from your controller
      return saveBook({ input, user: context.user });
    },
    deleteBook: async (_, { bookId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      }
      // Call the deleteBook function from your controller
      return deleteBook({ user: context.user, bookId });
    },
    login: async (_, args) => {
      // Call the login function from your controller
      return login(args);
    },
  },
};

module.exports = resolvers;
