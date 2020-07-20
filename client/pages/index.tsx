import Link from 'next/link';

import { initializeApollo } from '../apollo/client';
import { Layout } from '../components';

const IndexPage = () => {
  return <Layout title='Home'>posts</Layout>;
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
