import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello2: String
    posts: [Post]
  }
  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
  }
  type Post @key(fields: "id") {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User @provides(fields: "id")
    #comments: [Comment!]!
    updatedAt: Date
    createdAt: Date
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    #username: String! @external
    #reviews: [Review]
  }
  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }
  scalar Date
`;

export { typeDefs };
