const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v-password"
        );
        return userData;
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
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

    saveBook: async (_, { book }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },

    removeBook: async (_, { bookId }, context) => {
            if (context.user) {
             const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $pull: { savedBooks: { bookId } } },
               { new: true }
             );

              return updatedUser;
            }

            throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
