import React from 'react';
import { Layout } from '../components';
import { gql } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import Profile from '../components/Profile';

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
  const [flag, setFlag] = React.useState(false);
  const { success, data, error } = currentUser;

  return (
    <Layout title='Current User'>
      {error && <h1>{error.message}</h1>}
      <h1>{success && data.email}</h1>
      <h1>invitations: {success && data.invitations}</h1>
      <h1>role: {success && data.role}</h1>
      <h1>
        {!error && success && data.profile
          ? data.profile.username
          : 'no profile'}
      </h1>
      <button
        className='button mt-4 mb-4'
        disabled={!success && true}
        onClick={() => setFlag(!flag)}
      >
        Add/Edit Profile
      </button>
      {flag && <Profile profile={data.profile ? data.profile : null} />}
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
