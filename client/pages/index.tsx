import { Container, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Link from '../src/Link';

const CURRENTUSER = gql`
  query {
    currentUser {
      email
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(CURRENTUSER, {
    fetchPolicy: 'network-only',
  });
  console.log(data);
  //to change by a Loading component
  if (loading) {
    return 'loading';
  }

  return (
    <Container>
      <Typography variant='h3' color='primary'>
        {data && data.currentUser?.email
          ? data.currentUser?.email
          : 'please to sign'}
      </Typography>
      <Link href='/signup' color='secondary'>
        Go to the sing up page
      </Link>
      <Link href='/signin' color='secondary'>
        Go to the sing in page
      </Link>
      {JSON.stringify(error)}
    </Container>
  );
};

export default IndexPage;
