const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../controllers/user-controller');
const { User } = require('../models');

const { AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError();
      }
      // Call the getSingleUser function from your controller
      return getSingleUser(context.user._id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      return createUser(args);
    },
    saveBook: async (_, { input }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError();
      }
      // Call the saveBook function from your controller
      return saveBook({ input, user: context.user });
    },
    deleteBook: async (_, { bookId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError();
      }
      // Call the deleteBook function from your controller
      return deleteBook({ user: context.user, bookId });
    },
    login: async (_, args) => {
      return login(args);
    },
  },
};

module.exports = resolvers;
