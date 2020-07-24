import React from "react";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Layout, Form, ButtonsSubmit } from "../components";

const LOGIN = gql`
  mutation LOGINUSER($data: LogInUserInput) {
    logInUser(data: $data) {
      success
      error {
        message
      }
    }
  }
`;
const initState = {
  email: "christophe.moreira@outlook.com",
  password: "password",
};
const SignIn = () => {
  const router = useRouter();
  const [state, setState] = React.useState(initState);
  const [signIn, { data, error }] = useMutation(LOGIN, {
    onCompleted: () => router.push("/"),
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
  const handleState = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Layout title="Sign In">
      <form onSubmit={handleSubmit}>
        <Form values={state} handleChange={handleState} />
        <ButtonsSubmit />
      </form>
      {error && error.message}
    </Layout>
  );
};

export default SignIn;
