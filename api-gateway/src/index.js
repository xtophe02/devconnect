import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import FileUploadDataSource from '@profusion/apollo-federation-upload';

class AuthenticatedDataSource extends FileUploadDataSource {
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
      request.http.headers.set('token', context.req.headers.cookie);
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
    throw new Error('USERS_URL&&POSTS_URL&&PROFILES needs to be defined');
  }
  const server = new ApolloServer({
    gateway: new ApolloGateway({
      // Add this line in order to support file uploads.
      buildService: ({ url }) => new AuthenticatedDataSource({ url }),
      serviceList: [
        { name: 'users', url: process.env.USERS_URL },
        { name: 'posts', url: process.env.POSTS_URL },
        { name: 'profiles', url: process.env.PROFILES_URL },
      ],
    }),
    context: ({ req, res }) => {
      return { req, res };
    },
    subscriptions: false,
  });

  const { url } = await server.listen();

  console.log(`🚀  Server ready at ${url}`);
};

runServer().catch((error) => {
  console.error('💥  Failed to start server:', error);
  process.exit(1);
});
