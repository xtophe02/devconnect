import { useApolloClient } from "@apollo/client";
import { isLoggedInVar } from "../../apollo/cache";
import { LOGOUTUSER } from "../../queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export const LogoutButton = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [logOutUser] = useMutation(LOGOUTUSER, {
    onCompleted: () => router.push("/"),
  });
  return (
    <a
      data-testid="logout-button"
      className="button is-danger"
      onClick={() => {
        // Since we're logging out, remove all traces of the current user
        // from the cache. First use `cache.evict()` to remove the stored
        // `me` reference that was added to the cache by the `GET_MY_TRIPS`
        // query in `profile.tsx`. Then trigger garbage collection using
        // `cache.gc()` to remove the cached `User` object that is no longer
        // reachable.
        // client.cache.evict({ fieldName: 'me' });
        client.cache.gc();

        // Remove user details from localStorage.
        localStorage.clear();

        // Let other parts of the application that are relying on logged in
        // state know we're now logged out.
        isLoggedInVar(false);
        logOutUser();
      }}
    >
      Logout
    </a>
  );
};
