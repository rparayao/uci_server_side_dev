import { buildSchema } from 'graphql';


// Construct a schema, using GraphQL schema language
export default buildSchema(`
  type Bill {
    id: ID!
    label: String!
    category: String!
    amount: Float
    past_due: Boolean
  }

  type PastDueBill {
    id: ID!
    owner_id: Int!
    days_due: Int
    bill_id: Int
    amount: Float
  }

  type ActionResponse {
    successful: Boolean!
  }

  input BillInput {
    label: String!
    category: String!
    amount: Float!
  }

  type User {
    id: ID!
    displayName: String!
    username: String!
  }


  input LoginInput {
    username: String!
    password: String!
  }

  input UserInput {
    displayName: String!
    email: String!
    password: String!
    username: String!
  }



  type Query {   
    getBills: [Bill]
    getPastDue: [PastDueBill]
    currentUser: User
  }

  type Mutation {
    deleteBill(id: ID!): ActionResponse
    createBill(input: BillInput!): Bill
    login(loginInput: LoginInput!): User
    logout: ActionResponse
    signup(user: UserInput!): User
  }


`);
