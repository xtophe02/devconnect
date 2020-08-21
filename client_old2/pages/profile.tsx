import React from "react";
import { Layout, Loading } from "../components";
import { useQuery } from "@apollo/client";
import { CURRENTUSER } from "../queries";
import { Profile } from "../components";
import { redirect } from "../utils/redirect";
import bulmaPageloader from "/";

const profile = () => {
  redirect();
  const { data, loading, error } = useQuery(CURRENTUSER);
  return (
    <Layout title="sss" subtitle="my profile">
      {loading && (
        <div className="pageloader is-bottom-to-top">
          <span className="title">Pageloader</span>
        </div>
      )}
      {error && <p>error</p>}

      {data && data.currentUser && (
        // <div className="pageloader is-bottom-to-top is-active">
        //   <span className="title">Pageloader</span>
        // </div>
        // <Profile data={data.currentUser.data} loading={loading} />
        <Loading />
      )}
    </Layout>
  );
};

export default profile;
