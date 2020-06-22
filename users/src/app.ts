import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers/users-resolver';

const app = express();

app.set('trust proxy', true); //behind nginx

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

server.applyMiddleware({ app, path: '/graphql/users' });

export { app };
