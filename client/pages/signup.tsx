import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { Roles } from '@cmdevconnect/common';
import { Layout, Form, Upload } from '../components';

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

  const [state, setState] = React.useState({
    email: 'christophe.moreira@outlook.com',
    password: 'password',
    name: 'Christophe Moreira',
    username: 'chrismo',
    role: Roles.Admin,
    avatar: {},
  });
  const [signUp, { data, error }] = useMutation(SIGNUP, {
    // onCompleted: (data) => console.log(data),
    onCompleted: () => router.push('/'),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      setState({ ...state, avatar: file });
    }
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
            <Upload handleFile={handleFile} />
            <div className='field'>
              <p className='control'>
                <button className='button is-success'>Login</button>
              </p>
            </div>
          </form>
          {error && JSON.stringify(error)}
        </div>

        <div className='column'></div>
      </div>
    </Layout>
  );
};

export default SignUp;
