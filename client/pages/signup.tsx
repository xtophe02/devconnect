import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";

const SIGNUP = gql`
  mutation SIGNUP($data: SignUpInput!) {
    signUp(data: $data) {
      email
      id
    }
  }
`;

const SignUp = () => {
  const router = useRouter();

  const [signUp, { data, error }] = useMutation(SIGNUP, {
    onCompleted: () => router.push("/"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp({
      variables: {
        data: {
          email: "christophe.moreira@outlook.com",
          password: "password",
          name: "Christophe Moreira",
          username: "chrismo",
        },
      },
    }).catch((err) => console.log(err));
  };

  return (
    <Container>
      <Typography variant="h3" color="primary">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <button type="submit">Sign Up</button>
      </form>
      {error && JSON.stringify(error)}
    </Container>
  );
};

export default SignUp;
