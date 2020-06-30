const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  didReceiveResponse({ request, response, context }) {
    const cookie = response.http.headers.get('set-cookie');
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
      // console.log(context.req.headers);
      request.http.headers.set('token', context.req.headers.cookie);
    }

    return context;
  }
}

const gateway = new ApolloGateway({
  serviceList: [{ name: 'auth', url: process.env.AUTH_URL }],
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const start = async () => {
  if (!process.env.AUTH_URL) {
    throw new Error('AUTH_URL needs to be defined');
  }
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
    context: ({ req, res }) => {
      return { req, res };
    },
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

// setTimeout(() => start(), 10000);
start();
