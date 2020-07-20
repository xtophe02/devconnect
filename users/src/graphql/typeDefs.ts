import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    allUsers: allUsersResponse
    currentUser: currentUserResponse
  }
  type User @key(fields: "id") @key(fields: "email") {
    id: ID!
    email: String!
    role: String!
    owner: String
    invitations: Int
    createdAt: Date
    updatedAt: Date
  }
  type allUsersResponse {
    success: Boolean
    data: [User]
    error: Error
  }
  type currentUserResponse {
    success: Boolean
    data: User
    error: Error
  }
  type Error @key(fields: "status") @key(fields: "message") {
    status: Int
    message: String
  }
  extend type Mutation {
    createUser(data: CreateUserInput): CreateUserResponse
    editUser(data: EditUserInput): EditUserResponse
    logInUser(data: LogInUserInput): LogInUserResponse
    logOutUser: LogOutUserResponse
  }
  type CreateUserResponse {
    success: Boolean
    error: Error
  }
  type EditUserResponse {
    success: Boolean
    error: Error
  }
  type LogInUserResponse {
    success: Boolean
    error: Error
  }
  type LogOutUserResponse {
    success: Boolean
    error: Error
  }
  input CreateUserInput {
    email: String!
    password: String!
    role: String!
    invitations: Int
  }
  input EditUserInput {
    email: String
    password: String
    role: String
    invitations: Int
  }
  input LogInUserInput {
    email: String
    password: String
  }
  scalar Date
`;

export { typeDefs };
