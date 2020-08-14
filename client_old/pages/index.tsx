import Link from "next/link";

import { initializeApollo } from "../apollo/client";
import { Layout } from "../components";
import { gql } from "@apollo/client";
import { CURRENTUSER } from "./current-user";

const HELLO = gql`
  query {
    hello
  }
`;

const IndexPage = (props) => {
  console.log(props);

  return <Layout title="Home">posts</Layout>;
};
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.readQuery({
    query: HELLO,
    // variables: allPostsQueryVars,
  });
  // console.log(apolloClient.cache.data);
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    // unstable_revalidate: 1,
  };
}
export default IndexPage;
