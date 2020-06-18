import { Container, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const HELLO = gql`
  query {
    hello
  }
`;
const IndexPage = () => {
  const { loading, error, data } = useQuery(HELLO);
  console.log(loading);
  console.log(data);
  return (
    <Container>
      <Typography variant='h3' color='primary'>
        Hello Next.js
      </Typography>
    </Container>
  );
};

export default IndexPage;
