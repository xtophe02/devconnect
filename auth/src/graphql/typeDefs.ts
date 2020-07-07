import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
    currentUser: User
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User!
    signIn(data: SignInInput!): User!
    singleUpload(file: Upload): File
  }
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: [Role]
    # password: String!
    avatar: String
    # posts: [Post!]!
    # comments: [Comment!]!
    # updatedAt: String!
    createdAt: Date
  }
  enum Role {
    ADMIN
    MANAGER
    USER
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  input SignUpInput {
    name: String!
    username: String!
    email: String!
    password: String!
    avatar: Upload
    # createAt: Date
    role: [Role]
  }
  input SignInInput {
    email: String!
    password: String!
  }
  scalar Date
  scalar Upload
`;

export { typeDefs };
