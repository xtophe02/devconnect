import { Container, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import Link from '../src/Link';
import { initializeApollo } from '../apollo/client';

// const HELLO = gql`
//   query Hello {
//     hello
//   }
// `;
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

  // const { loading, error, data } = useQuery(CURRENTUSER, {
  //   fetchPolicy: 'network-only',
  // });
  // console.log(data);
  //to change by a Loading component
  if (loading) {
    return 'loading';
  }

  return (
    <Container>
      <Typography variant='h3' color='primary'>
        {/* {data && data.hello ? data.hello : 'nok'} */}
        {data && data.currentUser?.email
          ? data.currentUser?.email
          : 'please to sign'}
      </Typography>
      <ul>
        <Link href='/signup' color='secondary'>
          <li>Sing Up</li>
        </Link>
        <Link href='/signin' color='secondary'>
          <li>Sign In</li>
        </Link>
        <Link href='/upload' color='secondary'>
          <li>Upload</li>
        </Link>
      </ul>

      {JSON.stringify(error)}
    </Container>
  );
};
// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: HELLO,
//     // variables: allPostsQueryVars,
//   });
//   // console.log(apolloClient.cache.data);
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     unstable_revalidate: 1,
//   };
// }
export default IndexPage;
