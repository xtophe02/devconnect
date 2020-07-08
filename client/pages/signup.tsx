import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { Roles } from '@cmdevconnect/common';
import { Layout, Form } from '../components';

const SIGNUP = gql`
  mutation SIGNUP($data: SignUpInput!) {
    signUp(data: $data) {
      email
      id
      avatar
    }
  }
`;
interface Values {
  email: string;
  password: string;
  name: string;
  username: string;
  role: Roles.Admin;
}
const SignUp = () => {
  const router = useRouter();
  const [state, setState] = React.useState({
    email: 'christophe.moreira@outlook.com',
    password: 'password',
    name: 'Christophe Moreira',
    username: 'chrismo',
    role: Roles.Admin,
  });
  const [signUp, { data, error }] = useMutation(SIGNUP, {
    onCompleted: () => router.push('/'),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    signUp({
      variables: {
        data: {
          ...state,
        },
      },
    }).catch((err) => console.log(err));
  };

  return (
    <Layout title='Sign Up'>
      <div className='columns'>
        <div className='column'></div>
        <div className='column is-three-quarters'>
          <form onSubmit={handleSubmit}>
            <Form values={state} handleChange={handleChange} />
          </form>
          {error && JSON.stringify(error)}
        </div>

        <div className='column'></div>
      </div>
    </Layout>
  );
};

export default SignUp;
