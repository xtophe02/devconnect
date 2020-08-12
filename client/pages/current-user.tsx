import React from "react";
import { Layout } from "../components";
import { gql } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import Profile from "../components/Profile";
import { create } from "domain";
import { capitalize } from "../utils/capitalize";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

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
          name
          username
          location
          avatar
          skills
          githubUsername
          social {
            facebook
            linkedin
          }
        }
      }
      error {
        message
      }
    }
  }
`;

const currentUser = ({ currentUser }) => {
  // const [flag, setFlag] = React.useState(false);
  const { success, data, error } = currentUser;
  const router = useRouter();
  return (
    <Layout title={data.email || null} subtitle={capitalize(data.role) || null}>
      {error && <h1>{error.message}</h1>}
      <h1>{success && data.email}</h1>
      <h1>invitations: {success && data.invitations}</h1>
      <h1>role: {success && data.role}</h1>

      <button
        className="button mt-4 mb-4"
        disabled={!success && true}
        onClick={() => router.push("/create-profile")}
      >
        {!error && success && !data.profile ? "Create Profile" : "Edit Profile"}
      </button>
    </Layout>
  );
};
export async function getServerSideProps({ req }) {
  try {
    const apolloClient = initializeApollo(req);
    const { data } = await apolloClient.query({
      query: CURRENTUSER,
      // variables: allPostsQueryVars,
    });

    return {
      props: {
        // initialApolloState: apolloClient.cache.extract(),
        ...data,
      },
      // unstable_revalidate: 1,
    };
  } catch (error) {
    console.log(error);
  }
}
export default currentUser;
