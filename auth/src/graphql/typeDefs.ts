import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
    hello2: String
    currentUser: User
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User!
    signIn(data: SignInInput!): User!
  }
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    # password: String!
    avatar: String
    # posts: [Post!]!
    # comments: [Comment!]!
    # updatedAt: String!
    createdAt: Date
  }
  input SignUpInput {
    name: String!
    username: String!
    email: String!
    password: String!
    avatar: String
    # createAt: Date
  }
  input SignInInput {
    email: String!
    password: String!
  }
  scalar Date
`;

export { typeDefs };
