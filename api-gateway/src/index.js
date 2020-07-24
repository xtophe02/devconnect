import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import FileUploadDataSource from "@profusion/apollo-federation-upload";
import express from "express";
import expressJwt from "express-jwt";
import cors from "cors";

const app = express();
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://client-srv:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(
  cors({
    credentials: true,
    origin: ["http://client-srv:3000", "https://devconnect.dev"],
  })
);
class AuthenticatedDataSource extends FileUploadDataSource {
  didReceiveResponse({ request, response, context }) {
    const cookie = response.http.headers.get("set-cookie");
    if (cookie) {
      if (context && context.res) {
        // console.log(Object.keys(context.res));
        context.res.cookie(cookie);
      }
    }
    return response;
  }
  willSendRequest({ request, context }) {
    if (context && context.req) {
      request.http.headers.set("token", context.req.headers.cookie);
    }

    return context;
  }
}

const runServer = async () => {
  if (
    !process.env.USERS_URL &&
    !process.env.USERS_URL &&
    !process.env.PROFILES_URL
  ) {
    throw new Error("USERS_URL&&POSTS_URL&&PROFILES needs to be defined");
  }
  const server = new ApolloServer({
    gateway: new ApolloGateway({
      // Add this line in order to support file uploads.
      buildService: ({ url }) => new AuthenticatedDataSource({ url }),
      serviceList: [
        { name: "users", url: process.env.USERS_URL },
        { name: "posts", url: process.env.POSTS_URL },
        { name: "profiles", url: process.env.PROFILES_URL },
      ],
    }),
    context: ({ req, res }) => {
      // console.log(req.headers);

      return { req, res };
    },
    subscriptions: false,
  });
  server.applyMiddleware({ app });
  // const { url } = await server.listen();
  app.listen(4000, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  // console.log(`🚀  Server ready at ${url}`);
};

runServer().catch((error) => {
  console.error("💥  Failed to start server:", error);
  process.exit(1);
});
