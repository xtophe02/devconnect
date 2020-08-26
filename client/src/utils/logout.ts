import { isLoggedInVar } from "../../apollo/cache";

export const logout = async (logOutUser, client) => {
  client.cache.gc();
  localStorage.clear();
  isLoggedInVar(false);
  await client.resetStore();
  await logOutUser();
};
