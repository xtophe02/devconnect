import { InMemoryCache } from "@apollo/client";
const ssrMode = typeof window === "undefined";
import { persistCache } from "apollo-cache-persist";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        userLoggedIn() {
          return userLoggedInVar();
        },
      },
    },
  },
});
// if (!ssrMode) {
//   persistCache({
//     cache,
//     storage: window.localStorage,
//   });
// }
// export const isLoggedInVar = () => {
//   if (ssrMode) return;
//   return cache.makeVar<boolean>(!!localStorage.getItem("userEmail"));
// };
// export const userLoggedInVar = () => {
//   if (ssrMode) return;
//   return cache.makeVar<string>(localStorage.getItem("userEmail"));
// };
export const userLoggedInVar = ssrMode
  ? null
  : cache.makeVar<string>(localStorage.getItem("userEmail"));
export const isLoggedInVar = ssrMode
  ? null
  : cache.makeVar<boolean>(!!localStorage.getItem("userEmail"));
