const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [{ name: "auth", url: process.env.AUTH_URL }],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        // Only add the token if a token exists
        // console.log("gateway", Object.keys(context));
        context.token
          ? // Split header string by space and pick token
            request.http.headers.set("jwt", context.token.split(" ")[1])
          : null;
      },
    });
  },
});

const start = async () => {
  if (!process.env.AUTH_URL) {
    throw new Error("AUTH_URL needs to be defined");
  }
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
    context: ({ req, res }) => {
      // console.log(req.session);
      // console.log(req.session._ctx.headers.cookie);
      // console.log(Object.keys(req));
      console.log(req.headers.authorization);
      const token = req.headers.authorization || null;
      return { token: token };
    },
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

// setTimeout(() => start(), 10000);
start();
