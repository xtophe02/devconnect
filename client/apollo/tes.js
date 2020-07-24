import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, Observable, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import withApollo from "next-with-apollo";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { endpoint, prodEndpoint, WSendpoint, WSprodEndpoint } from "../config";
import defaults from "../apollo-state/graphql/default-state";
import Mutation from "../apollo-state/resolvers/mutation-resolvers";
const wsClient = process.browser
  ? new SubscriptionClient(
      process.env.NODE_ENV === "development" ? WSendpoint : WSprodEndpoint,
      {
        reconnect: true,
      }
    )
  : null;
function createClient({ headers }) {
  const wsLink = process.browser ? new WebSocketLink(wsClient) : null;
  const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    credentials: "include",
  });
  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
      )
    : httpLink;
  const cache = new InMemoryCache();
  const request = async (operation) => {
    const contextObj = {
      fetchOptions: {
        credentials: "include",
      },
      headers: {
        cookie: headers && headers.cookie,
      },
    };
    operation.setContext(contextObj);
  };
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
  // end custom config functions
  const apolloClient = new ApolloClient({
    credentials: "include",
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log(graphQLErrors);
        }
        if (networkError) {
          console.log(networkError);
        }
      }),
      requestLink,
      withClientState({
        defaults, // default state
        resolvers: {
          Mutation, // mutations
        },
        cache,
      }),
      link,
    ]),
    cache,
  }); // end new apollo client
  return apolloClient;
}
export { wsClient };
export default withApollo(createClient);
