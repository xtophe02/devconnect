import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { applyMiddleware } from "graphql-middleware";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers/resolvers";
import {
  logInUserValidation,
  createUserValidation,
} from "./graphql/middlewares/user-validation";
import { getUserId } from "@cmdevconnect/common";

const app = express();

app.set("trust proxy", true); //behind nginx
// app.use(express.json()); //to have req.body
const schema = buildFederatedSchema([
  {
    typeDefs,
    resolvers,
  },
]);
const schemaWithMiddleware = applyMiddleware(
  schema,
  createUserValidation,
  logInUserValidation
);

const server = new ApolloServer({
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  schema: schemaWithMiddleware,
  // schema,
  context: async ({ req, res }) => {
    const user = await getUserId(req);
    // console.log(req.headers);
    return {
      user,
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

export { app };
