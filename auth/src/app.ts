import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers/auth-resolver';
import { signUpValidation } from './graphql/middlewares/user-validation';

const app = express();

app.set('trust proxy', true); //behind nginx
// app.use(express.json()); //to have req.body
const schema = buildFederatedSchema([
  {
    typeDefs,
    resolvers,
  },
]);
const schemaWithMiddleware = applyMiddleware(schema, signUpValidation);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  // schema,
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

export { app };
