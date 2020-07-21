import React from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Layout, Form } from "../components";

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
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary" type="submit">
              Submit
            </button>
          </p>
          <p className="control">
            <a className="button is-light" onClick={() => router.back()}>
              Cancel
            </a>
          </p>
        </div>
      </form>
      {error && error.message}
    </Layout>
  );
};

export default SignIn;
