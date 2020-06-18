import express from 'express';
// import "express-async-errors";
import cookieSession from 'cookie-session';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';

const typeDefs = gql`
  extend type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello(): string {
      return 'hello world';
    },
  },
};

const app = express();

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

app.set('trust proxy', true); //behind nginx

app.use(express.json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );

server.applyMiddleware({ app });

export { app };
