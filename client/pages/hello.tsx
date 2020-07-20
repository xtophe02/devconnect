import React from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const HELLO = gql`
  query Hello {
    hello
  }
`;
const Hello = () => {
  const { loading, error, data } = useQuery(HELLO, {
    fetchPolicy: "network-only",
  });
  if (loading) return "loading";
  return (
    <div>
      <h1>{data && data.hello}</h1>

      {JSON.stringify(error)}
    </div>
  );
};

export default Hello;
