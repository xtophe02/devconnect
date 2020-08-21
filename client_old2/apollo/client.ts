import { useMemo } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { cache } from "./cache";

let apolloClient;
const ssrMode = typeof window === "undefined";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    userLoggedIn: String!
  }
`;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: ssrMode,
    link: createUploadLink({
      uri: ssrMode ? "http://api-gateway-srv:4000/graphql" : "/graphql",
      credentials: "same-origin",
    }),
    cache: ssrMode ? new InMemoryCache() : cache,
    defaultOptions: {
      query: {
        // fetchPolicy: 'network-only',
        errorPolicy: "all",
      },
    },
    typeDefs,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (ssrMode) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
