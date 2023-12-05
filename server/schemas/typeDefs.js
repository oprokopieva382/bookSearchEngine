const typeDefs = `
type User {
    _id: ID
    name: String!
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
`;
