const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Float
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link:String
  }

   type Auth {
    token: ID!
    user : User
  }

   type Query {
   me: User
  }

    type Mutation {
     login(email: String!, password: String!): Auth

     addUser(username: String!, email: String!, password: String!): Auth
     saveBook(book: BookInput!): User //!check later
     removeBook(bookId : ID!): User
  }
`;
