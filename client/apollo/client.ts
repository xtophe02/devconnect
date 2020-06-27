import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { persistCache } from 'apollo-cache-persist';

let apolloClient;
const ssrMode = () => typeof window === 'undefined';
function createApolloClient() {
  const cache = new InMemoryCache();

  if (!ssrMode()) {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return new ApolloClient({
    ssrMode: ssrMode(),
    link: new HttpLink({
      uri: ssrMode() ? 'http://api-gateway-srv:4000/graphql' : '/graphql',
      credentials: 'include',
    }),

    cache,
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
  if (ssrMode()) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
