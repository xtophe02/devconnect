import { gql } from "@apollo/client";

export const HELLO = gql`
  query {
    hello
  }
`;
export const CURRENTUSER = gql`
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

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOGOUTUSER = gql`
  mutation LOGOUTUSER {
    logOutUser {
      success
    }
  }
`;
