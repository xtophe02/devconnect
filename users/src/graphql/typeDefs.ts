import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    hello: String
    currentUser: User
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User!
    signIn(data: SignInInput!): User!
    singleUpload(file: Upload): UploadedFileResponse
  }
  type User @key(fields: "id") {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String
    avatar: String
    createdAt: Date
  }

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
  input SignUpInput {
    name: String!
    username: String!
    email: String!
    password: String!
    # avatar: Upload
    role: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  scalar Date
  scalar Upload
`;

export { typeDefs };
