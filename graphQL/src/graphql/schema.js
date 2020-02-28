import { buildSchema } from 'graphql';



// Construct a schema, using GraphQL schema language
export default buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    sales: Int
  }

  type ActionResponse {
    successful: Boolean!
  }

  type Query {   
    getBooks: [Book]
  }

  input BookInput {
    title: String!
    author: String!
    sales: Int!
  }

  type Mutation {
    deleteBook(id: ID!): ActionResponse
    createBook(input: BookInput!): Book
  }


`);
