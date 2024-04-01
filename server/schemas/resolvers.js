const {
  createNewUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../controllers/user-controller');


const { AuthenticationError } = require('../utils/auth');
const { authMiddleware } = require('../utils/auth');
const resolvers = {
  Query: {
    me: async (_, userId, context) => {
      console.log(`context: ${userId._id}`);
      
      // Call the getSingleUser function from your controller
      return getSingleUser(userId._id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      console.log(`args: ${args.username}, ${args.email}, ${args.password}`);
      return createNewUser(args);
    },
    saveBook: async (_, { user, book }, context) => {
      console.log(`user: ${user}, book: ${book}`);
      // Call the saveBook function from your controller
      return saveBook({ user, book });
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
