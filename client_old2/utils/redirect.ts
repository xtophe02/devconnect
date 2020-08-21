import { useQuery } from "@apollo/client";
import { USER_LOGGED_IN } from "../queries";
import { useRouter } from "next/router";

export const redirect = () => {
  const { data } = useQuery(USER_LOGGED_IN);

  if (data && !data.userLoggedIn) useRouter().push("/");
  return;
};
