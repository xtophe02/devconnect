import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
    currentUser: User
  }
  type Error @key(fields: "status") @key(fields: "message") {
    status: Int
    message: String
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User!
    signIn(data: SignInInput!): User!
    signOut: Boolean
    singleUpload(file: Upload): UploadedFileResponse
    multipleUpload(files: [Upload]): UploadedFileResponse
  }
  type User @key(fields: "id") @key(fields: "email") {
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
