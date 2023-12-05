const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, { userId, username }) => {
      const query = userId ? { _id: userId } : { username };
      return User.findOne(query);
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { book }, { user }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        {
          $addToSet: { savedBooks: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    deleteBook: async (_, { bookId }, { user }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
    },
  },
};


module.exports = resolvers;