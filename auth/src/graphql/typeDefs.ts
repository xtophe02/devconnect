import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
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
    # photo: String
    # posts: [Post!]!
    # comments: [Comment!]!
    # updatedAt: String!
    # createdAt: String!
  }
  input SignUpInput {
    name: String!
    username: String!
    email: String!
    password: String!
    createAt: Date
  }
  input SignInInput {
    email: String!
    password: String!
  }
  scalar Date
`;

export { typeDefs };
