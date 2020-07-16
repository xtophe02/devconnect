import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
    me: User
    currentUser: User
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User!
    signIn(data: SignInInput!): User!
    signOut: Boolean
    singleUpload(file: Upload): UploadedFileResponse
    multipleUpload(files: [Upload]): UploadedFileResponse
  }
  type User @key(fields: "id") {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String
    avatar(options: CloudinaryOptions): String
    createdAt: Date
  }
  type UserJWT {
    id: String
    email: String
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
    avatar: Upload
    role: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  scalar Date
  scalar Upload
  scalar CloudinaryOptions
`;

export { typeDefs };
