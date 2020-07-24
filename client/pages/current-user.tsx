import React from "react";
import { Layout } from "../components";
import { gql } from "@apollo/client";
import { initializeApollo } from "../apollo/client";

const CURRENTUSER = gql`
  query CURRENTUSER {
    currentUser {
      success
      data {
        email
        role
        invitations
        createdAt
        profile {
          username
          location
        }
      }
      error {
        message
      }
    }
  }
`;

const currentUser = ({ data }) => {
  const { currentUser } = data;
  return (
    <Layout title="Current User">
      <h1>{currentUser.data.email}</h1>
      <h1>{currentUser.data.profile && currentUser.data.profile.username}</h1>
    </Layout>
  );
};
export async function getServerSideProps({ req }) {
  const apolloClient = initializeApollo(req);

  const { data } = await apolloClient.query({
    query: CURRENTUSER,
    // variables: allPostsQueryVars,
  });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      data,
    },
    // unstable_revalidate: 1,
  };
}
export default currentUser;
