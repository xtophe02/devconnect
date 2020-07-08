import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { initializeApollo } from '../apollo/client';
import { Layout } from '../components';

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

  // console.log(data);
  //to change by a Loading component
  if (loading) {
    return 'loading';
  }
  const setSubtitle = () => {
    if (data && data.currentUser?.email) return data.currentUser?.email;
    return 'please to sign';
  };
  return (
    <Layout title='Home' subtitle={setSubtitle()}>
      <ul>
        <li>
          <Link href='/signup'>
            <a>Sing Up</a>
          </Link>
        </li>

        <Link href='/signin'>
          <a>Sign In</a>
        </Link>
        <Link href='/upload'>
          <a>Upload</a>
        </Link>
        <Link href='/hello'>
          <a>Hello</a>
        </Link>
      </ul>

      {JSON.stringify(error)}
    </Layout>
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
