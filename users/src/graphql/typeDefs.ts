import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    hello: String
    currentUser: User
    users: [User]
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
`;

export { typeDefs };
