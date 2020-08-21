import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { applyMiddleware } from "graphql-middleware";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers/resolvers";

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
const schemaWithMiddleware = applyMiddleware(schema);

const server = new ApolloServer({
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  schema: schemaWithMiddleware,
  // schema,
  context: async ({ req, res }) => {
    const user = await getUserId(req);

    return {
      user,
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

export { app };
