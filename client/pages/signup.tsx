import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SIGNUP = gql`
  mutation SIGNUP($data: SignUpInput!) {
    signUp(data: $data) {
      email
    }
  }
`;

const SignUp = () => {
  const [signUp, { data }] = useMutation(SIGNUP, {
    onCompleted: (data) => console.log(data),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({
      variables: {
        data: {
          email: 'christophe.moreira@outlook.com3',
          password: 'password',
          name: 'Christophe Moreira',
          username: 'chrismo',
        },
      },
      // onCompleted: (data) => console.log(data),
    });
  };

  return (
    <Container>
      <Typography variant='h3' color='primary'>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Sign Up</button>
      </form>
    </Container>
  );
};

export default SignUp;
