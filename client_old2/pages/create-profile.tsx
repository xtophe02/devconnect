import React from "react";
import { Layout } from "../components";
import { Form } from "../components/";

const createProfile = () => {
  return (
    <Layout>
      <Form
        values={{ email: "", password: "" }}
        handleChange={() => {}}
        loading={false}
        profile
      />
    </Layout>
  );
};

export default createProfile;
