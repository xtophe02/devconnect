const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const cookieSession = require('cookie-session');
const express = require('express');

const app = express();
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== 'production',
  })
);

const gateway = new ApolloGateway({
  serviceList: [{ name: 'auth', url: process.env.AUTH_URL }],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        // Only add the token if a token exists
        // console.log('gateway', Object.keys(request.http.headers));
        // context.token
        //   ? // Split header string by space and pick token
        //     request.http.headers.set('jwt', context.token.split(' ')[1])
        //   : 'teste';
        console.log('willsendrequest', context);
        return request;
      },
    });
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
    context: ({ req }) => {
      // console.log(req.headers.authorization);
      // console.log(req.session.jwt);
      // const token = req.headers.authorization || null;
      // return { token: token };
      // console.log(Object.keys(req.session));
      console.log(req.session.jwt);
      return { user: 'fromcontext' };
    },
    subscriptions: false,
  });
  server.applyMiddleware({ app });
  const port = 4000;
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at ${port}`);
  });
};

// setTimeout(() => start(), 10000);
start();
