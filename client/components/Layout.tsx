import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import NavBar from "./NavBar";

const CURRENTUSER = gql`
  query {
    currentUser {
      email
    }
  }
`;

export const Layout = ({
  children,
  title = "to define",
  subtitle = "to define",
}) => {
  const { loading, error, data } = useQuery(CURRENTUSER, {
    fetchPolicy: "network-only",
  });

  const teste = data && data.currentUser ? data.currentUser.email : null;

  return (
    <>
      <NavBar loading={loading} email={teste} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
          </div>
        </div>
      </section>
      <div className="container">{children}</div>
    </>
  );
};
