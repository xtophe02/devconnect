import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieSession from 'cookie-session';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers/auth-resolver';

const app = express();

app.set('trust proxy', true); //behind nginx

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'production',
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

server.applyMiddleware({ app, path: '/graphql/auth' });

export { app };
