import React from "react";
import { Layout, LoginForm } from "../components";
import { useMutation, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import { LOGIN } from "../src/queries";
import { isLoggedInVar } from "../apollo/cache";

const initState = {
  email: "christophe.moreira@outlook.com",
  password: "password",
};
const Login = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [state, setState] = React.useState(initState);
  const [signIn, { loading, error }] = useMutation(LOGIN, {
    onCompleted: ({ logInUser }) => {
      localStorage.setItem("userEmail", logInUser.data.email as string);
      client.resetStore();
      isLoggedInVar(logInUser.success);
      router.push("/");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({
        variables: {
          data: {
            ...state,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Layout title="Login" subtitle="Enter your login credentials">
      <form onSubmit={handleSubmit}>
        <LoginForm
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </form>
    </Layout>
  );
};

export default Login;
