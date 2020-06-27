import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const SIGNUP = gql`
  mutation SIGNUP($data: SignUpInput!) {
    signUp(data: $data) {
      email
      username
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [signUp, { data }] = useMutation(SIGNUP, {
    onCompleted: () => router.push('/'),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({
      variables: {
        data: {
          email: 'christophe.moreira@outlook.com12',
          password: 'password',
          name: 'Christophe Moreira',
          username: 'chrismo',
        },
      },
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
