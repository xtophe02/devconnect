import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const SIGNIN = gql`
  mutation SIGNIN($data: SignInInput!) {
    signIn(data: $data) {
      email
    }
  }
`;

const SignIn = () => {
  const router = useRouter();
  const [signIn, { data }] = useMutation(SIGNIN, {
    onCompleted: () => router.push('/'),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
      variables: {
        data: {
          email: 'christophe.moreira@outlook.com',
          password: 'password',
        },
      },
    });
  };
  console.log('useMutation', data);
  return (
    <Container>
      <Typography variant='h3' color='primary'>
        Sign In {data && data.signIn.email}
      </Typography>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Sign In</button>
      </form>
    </Container>
  );
};

export default SignIn;
