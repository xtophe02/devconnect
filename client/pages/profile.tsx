import React from "react";
import { Layout, Profile } from "../components";
import { useQuery } from "@apollo/client";
import { CURRENTUSER } from "../src/queries";
import { useRouter } from "next/router";
import { redirect } from "../src/utils/redirect";

const profile = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(CURRENTUSER, {
    fetchPolicy: "network-only",
  });
  // if (loading) return <p>loading...</p>;
  // if (error) return <p>error</p>;
  // if (!data) return <p>no data</p>;
  if (!(data || loading)) {
    // redirect(router, data);
    router.push("/");
  }

  return (
    <Layout
      title="My Profile"
      subtitle={
        loading ? (
          <progress className="progress is-info" max="100">
            45%
          </progress>
        ) : (
          data.currentUser.data && data.currentUser.data.email
        )
      }
    >
      {data && <Profile currentUser={data.currentUser} />}
      {error && JSON.stringify(error)}
    </Layout>
  );
};

export default profile;
