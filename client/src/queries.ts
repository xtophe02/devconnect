import { gql } from "@apollo/client";

export const HELLO = gql`
  query HELLO {
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
  query ISUSERLOGGEDIN {
    isLoggedIn @client
  }
`;
export const USER_LOGGED_IN = gql`
  query USERLOGGEDIN {
    userLoggedIn @client
  }
`;

export const LOGOUTUSER = gql`
  mutation LOGOUTUSER {
    logOutUser {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation LOGINUSER($data: LogInUserInput) {
    logInUser(data: $data) {
      success
      data {
        email
        role
      }
      error {
        message
      }
    }
  }
`;

export const CREATEPROFILE = gql`
  mutation CREATEPROFILE($data: CreateProfileInput) {
    createProfile(data: $data) {
      success
      data {
        name
      }
      error {
        message
      }
    }
  }
`;
