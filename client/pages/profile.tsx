import React from "react";
import { Layout, Loading } from "../components";
import { useQuery } from "@apollo/client";
import { CURRENTUSER } from "../src/queries";

const profile = () => {
  const { data, loading, error } = useQuery(CURRENTUSER);

  return (
    <Layout
      title={
        data && data.currentUser.data ? data.currentUser.data.email : "no k"
      }
    >
      {loading && <Loading />}
      {data && data.currentUser.success ? "ok" : "modal not ok"}
    </Layout>
  );
};

export default profile;
