import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Layout } from '../components';

const ME = gql`
  query Me {
    me {
      email
      avatar(options: "50, true, true")
    }
  }
`;
const User = () => {
  const [teste, { loading, error, data }] = useLazyQuery(ME, {
    fetchPolicy: 'network-only',
  });

  return (
    <Layout title='Fetch User'>
      <h1>{data && data.me !== null ? data.me.email : 'click me'}</h1>
      {loading ? 'loading' : null}
      {data && data.me !== null ? <img src={data.me.avatar} /> : 'pic'}
      <button onClick={() => teste()}>fetch</button>
      {JSON.stringify(error)}
    </Layout>
  );
};

export default User;
