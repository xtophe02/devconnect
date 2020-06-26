import express from "express";
import { ApolloServer } from "apollo-server-express";
import cookieSession from "cookie-session";
import { buildFederatedSchema } from "@apollo/federation";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers/auth-resolver";

const app = express();

app.set("trust proxy", true); //behind nginx

app.use(express.json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: false,
//     // secure: process.env.NODE_ENV !== 'production',
//   })
// );

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),

  context: ({ req, res }) => {
    // console.log("app", req.session);
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

export { app };
