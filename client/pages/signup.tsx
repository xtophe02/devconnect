import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const SIGNUP = gql`
  mutation SIGNUP($data: SignUpInput!) {
    signUp(data: $data) {
      email
      id
      avatar
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [avatar, setAvatar] = React.useState();
  const [signUp, { data, error }] = useMutation(SIGNUP, {
    onCompleted: () => router.push('/'),
  });
  const handleChange = ({
    target: {
      files: [file],
    },
  }) => {
    setAvatar(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({
      variables: {
        data: {
          email: 'christophe.moreira@outlook.com',
          password: 'password',
          name: 'Christophe Moreira',
          username: 'chrismo',
          avatar,
        },
      },
    }).catch((err) => console.log(err));
  };

  return (
    <Container>
      <Typography variant='h3' color='primary'>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleChange} />
        <button type='submit'>Sign Up</button>
      </form>
      {error && JSON.stringify(error)}
      {/* {data ? <img src={data.signUp.avatar} alt='' /> : 'no pic'}
      {data && console.log(data.signUp.avatar)} */}
    </Container>
  );
};

export default SignUp;
